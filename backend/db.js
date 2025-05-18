// db.js
require("dotenv").config();            // 1️⃣ load .env immediately
const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_URI; // 2️⃣ grab it from env

const mongoDb = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // authSource=admin is implicit for Atlas
    });
    console.log("Connected to MongoDB");

    const items = await mongoose.connection.db
      .collection("category_items")
      .find({})
      .toArray();
    global.category_items = items;
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
};

module.exports = mongoDb;
