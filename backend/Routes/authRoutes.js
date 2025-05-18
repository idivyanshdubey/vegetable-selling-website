const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });
  if (!user || user.password !== password) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  res.json({ message: "Login successful", user });
});

module.exports = router;