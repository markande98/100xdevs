const express = require("express");

const { authMiddleware } = require("../middleware");
const {
  signIn,
  signUp,
  updateField,
  getUsers,
} = require("../controllers/user-controller");

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.put("/", authMiddleware, updateField);
router.get("/bulk", getUsers);

module.exports = router;
