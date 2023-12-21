const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  try {
    const { username, password } = req.body;
    const user = await User.create({
      username,
      password,
    });
    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).end();
  }
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  try {
    const courses = await Course.find().exec();
    res.status(200).json({
      courses,
    });
  } catch (error) {
    res.status(500).end();
  }
});

router.post("/courses/:courseId", userMiddleware, (req, res) => {
  // Implement course purchase logic
});

router.get("/purchasedCourses", userMiddleware, (req, res) => {
  // Implement fetching purchased courses logic
});

module.exports = router;
