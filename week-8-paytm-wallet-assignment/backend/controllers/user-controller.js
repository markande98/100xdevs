const zod = require("zod");
const { User, Account } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const { signinBody, signupBody, updateBody } = require("../schemas/index");

const signUp = async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const { username, password, firstName, lastName } = req.body;

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken/Incorrect inputs",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    hashedPassword,
    firstName,
    lastName,
  });

  const userId = user._id;

  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  return res.status(200).json({
    message: "User created successfully",
    token,
  });
};

const signIn = async (req, res) => {
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(411).json({
      message: "Error while logging in",
    });
  }

  const isPasswordsMatch = await bcrypt.compare(password, user.hashedPassword);

  if (!isPasswordsMatch) {
    return res.status(411).json({
      message: "Invalid Password!",
    });
  }

  const token = jwt.sign(
    {
      userId: user._id,
    },
    JWT_SECRET
  );

  return res.status(200).json({
    token,
    user,
  });
};

const updateField = async (req, res) => {
  const { success } = updateBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Error while updating information",
    });
  }
  const { password, lastName, firstName } = req.body;

  const newHashedPassword = await bcrypt.hash(password, 10);
  await User.updateOne(
    { _id: req.userId },
    {
      hashedPassword: newHashedPassword,
      lastName,
      firstName,
    }
  );

  return res.json({
    message: "Updated successfully",
  });
};

const getUsers = async (req, res) => {
  const filter = req.query.filter || "";
  const username = req.query.username || "";
  const users = await User.find({
    $and: [
      {
        username: {
          $ne: username,
        },
        $or: [
          {
            firstName: {
              $regex: filter,
            },
          },
          {
            lastName: {
              $regex: filter,
            },
          },
        ],
      },
    ],
  });

  res.json({
    users: users.map((user) => ({
      username: user.username,
      lastName: user.lastName,
      firstName: user.firstName,
      _id: user._id,
    })),
  });
};

module.exports = {
  signUp,
  signIn,
  updateField,
  getUsers,
};
