// index.js
require("dotenv").config();        // 1️⃣ Load .env before anything else

const express = require("express");
const cors = require("cors");
const mongoDb = require("./db");   // Import MongoDB connection file

const app = express();

app.use(express.json());
app.use(cors());

// 2️⃣ Connect to MongoDB using your MONGO_URI from .env
mongoDb();

// Routes
app.use("/api", require("./Routes/authRoutes.js"));
app.use("/api", require("./Routes/CreateUser.js"));
app.use("/api", require("./Routes/DisplayData.js"));

// Test Route
app.get("/", (req, res) => res.send("Server is running"));

// 3️⃣ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
