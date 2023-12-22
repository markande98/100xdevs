const { User } = require("../db");

async function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  const { username, password } = req.headers;

  const user = await User.findOne({ username, password }).exec();

  if (!user) return res.status(403).end();
  next();
}

module.exports = userMiddleware;
