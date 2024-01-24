const express = require("express");
const {
  getAccountBalance,
  moneyTransfer,
} = require("../controllers/account-controller");
const { authMiddleware } = require("../middleware");

const router = express.Router();

router.get("/balance", authMiddleware, getAccountBalance);
router.post("/transfer", authMiddleware, moneyTransfer);

module.exports = router;
