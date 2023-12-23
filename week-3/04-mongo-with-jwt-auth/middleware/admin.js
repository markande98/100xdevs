const jwt = require("jsonwebtoken");
const { Admin } = require("../db/index");
// Middleware for handling auth
async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { username } = decoded;
    const admin = await Admin.findOne({ username }).exec();
    if (!admin)
      return res.status(403).json({
        message: "Not Authorized",
      });
    next();
  } catch (error) {
    res.status(403).json({
      message: "Not Authorized",
    });
  }
}

module.exports = adminMiddleware;
