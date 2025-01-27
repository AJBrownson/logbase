const Wallet = require('../models/Wallet');
const Customer = require('../models/Customer');
const paystack = require('paystack')(process.env.PAYSTACK_SECRET_KEY);

const walletController = {
  // Get wallet balance and transaction history
  getWalletInfo: async (req, res) => {
    try {
      const wallet = await Wallet.findOne({ customer: req.customer._id })
        .populate('customer', 'name email'); // Only populate necessary fields

      if (!wallet) {
        // Create a new wallet if one doesn't exist
        const newWallet = await Wallet.create({
          customer: req.customer._id,
          balance: 0
        });
        return res.json(newWallet);
      }

      res.json(wallet);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Initialize Paystack transaction for wallet funding
  initiateTransaction: async (req, res) => {
    try {
      const { amount } = req.body;
      const customer = await Customer.findById(req.customer._id);
      
      if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
      }

      // Generate a unique reference
      const reference = `WAL-${Date.now()}-${Math.random().toString(36).substring(7)}`;
      
      const response = await paystack.transaction.initialize({
        amount: amount * 100, // Convert to kobo
        email: customer.email,
        reference,
        callback_url: `${process.env.FRONTEND_URL}/wallet/verify`,
        metadata: {
          customerId: customer._id,
          type: 'wallet_funding'
        }
      });

      // Create a pending transaction in the wallet
      await Wallet.findOneAndUpdate(
        { customer: customer._id },
        {
          $push: {
            transactions: {
              type: 'credit',
              amount,
              description: 'Wallet funding',
              reference,
              status: 'pending',
              metadata: {
                paymentMethod: 'paystack',
                currency: 'NGN'
              }
            }
          }
        },
        { upsert: true }
      );
      
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Verify Paystack transaction and update wallet
  verifyTransaction: async (req, res) => {
    try {
      const { reference } = req.query;
      
      const response = await paystack.transaction.verify(reference);
      
      if (response.data.status === 'success') {
        const { customerId } = response.data.metadata;
        const amount = response.data.amount / 100;

        const wallet = await Wallet.findOneAndUpdate(
          { 
            customer: customerId,
            'transactions.reference': reference 
          },
          {
            $inc: { balance: amount },
            $set: { 
              'transactions.$.status': 'completed',
              'transactions.$.metadata.paymentProvider': 'paystack'
            }
          },
          { new: true }
        );

        res.json(wallet);
      } else {
        // Update transaction status to failed
        await Wallet.findOneAndUpdate(
          { 'transactions.reference': reference },
          { $set: { 'transactions.$.status': 'failed' } }
        );

        throw new Error('Transaction failed');
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Process a purchase using wallet balance
  processPurchase: async (req, res) => {
    try {
      const { amount, orderId } = req.body;
      const customerId = req.customer._id;

      const wallet = await Wallet.findOne({ customer: customerId });
      
      if (!wallet || !wallet.hassufficientFunds(amount)) {
        return res.status(400).json({ 
          error: 'Insufficient funds',
          currentBalance: wallet ? wallet.balance : 0,
          required: amount
        });
      }

      const updatedWallet = await Wallet.findOneAndUpdate(
        { customer: customerId },
        {
          $inc: { balance: -amount },
          $push: {
            transactions: {
              type: 'debit',
              amount,
              description: `Purchase - Order #${orderId}`,
              status: 'completed',
              metadata: {
                orderId,
                type: 'purchase'
              }
            }
          }
        },
        { new: true }
      );

      res.json(updatedWallet);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};