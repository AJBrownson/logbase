const express = require("express");
const router = express.Router();
const walletController = require("../controllers/walletController");
const { authenticateCustomer } = require("../middleware/auth");

router.get("/wallet", authenticateCustomer, walletController.getWalletInfo);

router.post(
  "/wallet/fund",
  authenticateCustomer,
  walletController.initiateTransaction
);

router.get("/wallet/verify", walletController.verifyTransaction);

router.post(
  "/wallet/purchase",
  authenticateCustomer,
  walletController.processPurchase
);

module.exports = router;
