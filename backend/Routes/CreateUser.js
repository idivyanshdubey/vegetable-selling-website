const express = require("express");
const User = require("../models/User"); // Assuming a User model is defined
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Signup failed" });
  }
});

module.exports = router;