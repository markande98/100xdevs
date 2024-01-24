const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const mainRouter = require("./routes/index");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/paytm")
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Error while connecting");
  });

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/v1", mainRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "hello from paytm backend",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server started at PORT: ${PORT}`);
});
