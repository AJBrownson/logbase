const Wallet = require ('../models/Wallet');
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");


// Initialize Flutterwave payment
const fundWallet = async (req, res) => {
  const { amount } = req.body;
  const userId = req.user._id; // Assuming you have user data in req.user

  try {
    // Generate a unique transaction reference
    const txRef = uuidv4();

    // Flutterwave payment payload
    const payload = {
      tx_ref: txRef,
      amount: amount,
      currency: "NGN",
      redirect_url: "http://localhost:3000/api/wallet/flutterwave/callback",
      payment_options: "card",
      meta: {
        userId: userId.toString(),
      },
      customer: {
        email: req.user.email, // Assuming user email is available
      },
      customizations: {
        title: "Wallet Funding",
        description: "Fund your wallet",
      },
    };

    // Make request to Flutterwave API
    const response = await axios.post(
      "https://api.flutterwave.com/v3/payments",
      payload,
      {
        headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
        },
      }
    );

    // Redirect user to Flutterwave payment page
    res.status(200).json({ authorization_url: response.data.data.link });
  } catch (error) {
    console.error("Failed to initiate Flutterwave payment:", error);
    res.status(500).json({ message: "Failed to initiate payment" });
  }
};

// Handle Flutterwave callback
const handleFlutterwaveCallback = async (req, res) => {
  const { tx_ref, status, amount } = req.body;

  if (status === "successful") {
    try {
      // Find the wallet associated with the transaction
      const wallet = await Wallet.findOne({ userId: req.body.meta.userId });

      if (wallet) {
        // Update wallet balance
        wallet.balance += parseFloat(amount);
        wallet.transactions.push({
          type: "credit",
          amount: parseFloat(amount),
          description: "Wallet funding via Flutterwave",
        });

        await wallet.save();
      }

      res.status(200).json({ message: "Wallet funded successfully" });
    } catch (error) {
      console.error("Failed to update wallet:", error);
      res.status(500).json({ message: "Failed to update wallet" });
    }
  } else {
    res.status(400).json({ message: "Payment failed" });
  }
};

// Get wallet balance
const getWalletBalance = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.user._id });

    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    res.status(200).json(wallet);
  } catch (error) {
    console.error("Failed to fetch wallet data:", error);
    res.status(500).json({ message: "Failed to fetch wallet data" });
  }
};

module.exports = { fundWallet, handleFlutterwaveCallback, getWalletBalance };

// const Wallet = require('../models/Wallet');
// const Customer = require('../models/Customer');
// const paystack = require('paystack')(process.env.PAYSTACK_SECRET_KEY);

// const walletController = {
//   // Get wallet balance and transaction history
//   getWalletInfo: async (req, res) => {
//     try {
//       const wallet = await Wallet.findOne({ customer: req.customer._id })
//         .populate('customer', 'name email'); // Only populate necessary fields

//       if (!wallet) {
//         // Create a new wallet if one doesn't exist
//         const newWallet = await Wallet.create({
//           customer: req.customer._id,
//           balance: 0
//         });
//         return res.json(newWallet);
//       }

//       res.json(wallet);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   },

//   // Initialize Paystack transaction for wallet funding
//   initiateTransaction: async (req, res) => {
//     try {
//       const { amount } = req.body;
//       const customer = await Customer.findById(req.customer._id);
      
//       if (!customer) {
//         return res.status(404).json({ error: 'Customer not found' });
//       }

//       // Generate a unique reference
//       const reference = `WAL-${Date.now()}-${Math.random().toString(36).substring(7)}`;
      
//       const response = await paystack.transaction.initialize({
//         amount: amount * 100, // Convert to kobo
//         email: customer.email,
//         reference,
//         callback_url: `${process.env.FRONTEND_URL}/wallet/verify`,
//         metadata: {
//           customerId: customer._id,
//           type: 'wallet_funding'
//         }
//       });

//       // Create a pending transaction in the wallet
//       await Wallet.findOneAndUpdate(
//         { customer: customer._id },
//         {
//           $push: {
//             transactions: {
//               type: 'credit',
//               amount,
//               description: 'Wallet funding',
//               reference,
//               status: 'pending',
//               metadata: {
//                 paymentMethod: 'paystack',
//                 currency: 'NGN'
//               }
//             }
//           }
//         },
//         { upsert: true }
//       );
      
//       res.json(response.data);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   },

//   // Verify Paystack transaction and update wallet
//   verifyTransaction: async (req, res) => {
//     try {
//       const { reference } = req.query;
      
//       const response = await paystack.transaction.verify(reference);
      
//       if (response.data.status === 'success') {
//         const { customerId } = response.data.metadata;
//         const amount = response.data.amount / 100;

//         const wallet = await Wallet.findOneAndUpdate(
//           { 
//             customer: customerId,
//             'transactions.reference': reference 
//           },
//           {
//             $inc: { balance: amount },
//             $set: { 
//               'transactions.$.status': 'completed',
//               'transactions.$.metadata.paymentProvider': 'paystack'
//             }
//           },
//           { new: true }
//         );

//         res.json(wallet);
//       } else {
//         // Update transaction status to failed
//         await Wallet.findOneAndUpdate(
//           { 'transactions.reference': reference },
//           { $set: { 'transactions.$.status': 'failed' } }
//         );

//         throw new Error('Transaction failed');
//       }
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   },

//   // Process a purchase using wallet balance
//   processPurchase: async (req, res) => {
//     try {
//       const { amount, orderId } = req.body;
//       const customerId = req.customer._id;

//       const wallet = await Wallet.findOne({ customer: customerId });
      
//       if (!wallet || !wallet.hassufficientFunds(amount)) {
//         return res.status(400).json({ 
//           error: 'Insufficient funds',
//           currentBalance: wallet ? wallet.balance : 0,
//           required: amount
//         });
//       }

//       const updatedWallet = await Wallet.findOneAndUpdate(
//         { customer: customerId },
//         {
//           $inc: { balance: -amount },
//           $push: {
//             transactions: {
//               type: 'debit',
//               amount,
//               description: `Purchase - Order #${orderId}`,
//               status: 'completed',
//               metadata: {
//                 orderId,
//                 type: 'purchase'
//               }
//             }
//           }
//         },
//         { new: true }
//       );

//       res.json(updatedWallet);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   }
// };
