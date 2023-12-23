const jwt = require("jsonwebtoken");
const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  try {
    const { username, password } = req.body;
    const token = jwt.sign({ username }, process.env.JWT_SECRET);
    await User.create({
      username,
      password,
      token,
    });
    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).end();
  }
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(401).json({
        message: "invalid credentials",
      });
    }
    res.status(200).json({
      token: user.token,
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

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  try {
    const course = await Course.findOne({ _id: req.params.courseId });
    const updatedUser = await User.findOneAndUpdate(
      {
        username: req.username,
      },
      {
        $push: { purchasedCourses: course },
      }
    );
    res.status(200).json({
      message: "Course Purchased successfully",
      updatedUser,
    });
  } catch (error) {
    res.status(500).end();
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  try {
    const user = await User.findOne({ username: req.username });
    await user.populate("purchasedCourses");
    res.status(200).json({
      purchasedCourses: user.purchasedCourses,
    });
  } catch (error) {
    res.status(500).end();
  }
});

module.exports = router;
