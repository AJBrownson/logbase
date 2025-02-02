const express = require("express");
const router = express.Router();
const {
  fundWallet,
  getWalletBalance,
  handleFlutterwaveCallback,
} = require("../controller/walletController");
// import { protect } from "../middleware/authMiddleware.js";

// Fund wallet route
router.post("/fund", fundWallet);

// Get wallet balance
router.get("/balance", getWalletBalance);

// Flutterwave payment callback
router.post("/flutterwave/callback", handleFlutterwaveCallback);

module.exports = router;




// const express = require("express");
// const router = express.Router();
// const walletController = require("../controllers/walletController");
// const { authenticateCustomer } = require("../middleware/auth");

// router.get("/wallet", authenticateCustomer, walletController.getWalletInfo);

// router.post(
//   "/wallet/fund",
//   authenticateCustomer,
//   walletController.initiateTransaction
// );

// router.get("/wallet/verify", walletController.verifyTransaction);

// router.post(
//   "/wallet/purchase",
//   authenticateCustomer,
//   walletController.processPurchase
// );

// module.exports = router;
