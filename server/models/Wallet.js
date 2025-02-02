const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
    unique: true,
  },
  balance: {
    type: Number,
    default: 0,
    min: 0,
  },
  transactions: [
    {
      type: {
        type: String,
        enum: ["credit", "debit"],
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Wallet = mongoose.model("Wallet", walletSchema);
module.exports = { Wallet }





// const mongoose = require("mongoose");

// const walletSchema = new mongoose.Schema(
//   {
//     customer: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Customer", // References your Customer model
//       required: true,
//       unique: true,
//     },
//     balance: {
//       type: Number,
//       default: 0,
//       min: 0,
//     },
//     transactions: [
//       {
//         type: {
//           type: String,
//           enum: ["credit", "debit"],
//           required: true,
//         },
//         amount: {
//           type: Number,
//           required: true,
//         },
//         description: String,
//         reference: String,
//         status: {
//           type: String,
//           enum: ["pending", "completed", "failed"],
//           default: "pending",
//         },
//         metadata: {
//           // Storing additional transaction details
//           paymentMethod: String,
//           currency: {
//             type: String,
//             default: "NGN",
//           },
//           // paymentProvider: {
//           //   type: String,
//           //   default: "paystack",
//           // },
//         },
//         timestamp: {
//           type: Date,
//           default: Date.now,
//         },
//       },
//     ],
//   },
//   {
//     timestamps: true,
//   }
// );

// // Add methods to the wallet schema for common operations
// walletSchema.methods.hassufficientFunds = function (amount) {
//   return this.balance >= amount;
// };

// walletSchema.methods.getTransactionHistory = function (limit = 10) {
//   return this.transactions
//     .sort((a, b) => b.timestamp - a.timestamp)
//     .slice(0, limit);
// };

// const Wallet = mongoose.model("Wallet", walletSchema);

// export default Wallet;