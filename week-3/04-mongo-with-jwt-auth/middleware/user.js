const jwt = require("jsonwebtoken");
const { User } = require("../db");
async function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { username } = decoded;
    const admin = await User.findOne({ username }).exec();
    if (!admin)
      return res.status(403).json({
        message: "Not Authorized",
      });
    req.username = username;
    next();
  } catch (error) {
    res.status(403).json({
      message: "Not Authorized",
    });
  }
}

module.exports = userMiddleware;
