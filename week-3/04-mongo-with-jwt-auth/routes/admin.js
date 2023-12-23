const { Router } = require("express");
const jwt = require("jsonwebtoken");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  try {
    const { username, password } = req.body;
    const token = jwt.sign({ username }, process.env.JWT_SECRET);
    await Admin.create({
      username: username,
      password: password,
      token: token,
    });
    res.status(201).json({
      message: "Admin created successfully",
    });
  } catch (error) {
    res.status(500).end();
  }
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username, password });

    if (!admin) {
      return res.status(401).json({
        message: "invalid credentials",
      });
    }
    res.status(200).json({
      token: admin.token,
    });
  } catch (error) {
    res.status(500).end();
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  try {
    const { title, description, image, price } = req.body;
    const course = await Course.create({
      title,
      description,
      image,
      price,
    });
    res.status(201).json({
      message: "Course created successfully",
      course: course.id,
    });
  } catch (error) {
    res.status(500).end();
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  try {
    const courses = await Course.find().exec();
    res.status(200).json({
      message: "Course created successfully",
      courses,
    });
  } catch (error) {
    res.status(500).end();
  }
});

module.exports = router;
