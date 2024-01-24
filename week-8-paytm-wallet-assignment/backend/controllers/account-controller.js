const mongoose = require("mongoose");

const { Account } = require("../db");

const getAccountBalance = async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });

  return res.status(200).json({
    balance: account.balance,
  });
};

const moneyTransfer = async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { to, amount } = req.body;

  const account = await Account.findOne({
    userId: req.userId,
  });

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  const toAccount = await Account.findOne({
    userId: to,
  });

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  await Account.updateOne(
    {
      userId: req.userId,
    },
    {
      $inc: {
        balance: -amount,
      },
    }
  ).session(session);

  await Account.updateOne(
    {
      userId: to,
    },
    {
      $inc: {
        balance: amount,
      },
    }
  ).session(session);

  await session.commitTransaction();

  return res.status(200).json({
    message: "Transaction successfull",
  });
};

module.exports = {
  getAccountBalance,
  moneyTransfer,
};
