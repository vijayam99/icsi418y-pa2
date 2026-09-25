const express = require("express");
const cors = require("cors");
const User = require("./models/User");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

app.get("/", (req, res) => {
  res.send("Server is working");
});

app.post("/signup", async (req, res) => {
  try {
    const { f_name, l_name, username, password } = req.body;

    if (!f_name || !l_name || !username || !password) {
      return res.status(400).json({
        message: "Please fill in all fields"
      });
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        message: "Username already exists"
      });
    }

    const newUser = new User({
      f_name,
      l_name,
      username,
      password
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully"
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error"
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Please fill in all fields"
      });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        message: "Username does not exist"
      });
    }

    if (user.password !== password) {
      return res.status(400).json({
        message: "Incorrect password"
      });
    }

    res.status(200).json({
      message: "Login successful"
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});