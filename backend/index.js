// index.js
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoDb = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoDb();

// Define your routes clearly:
app.use("/api/auth", require("./Routes/authRoutes"));     // for login/signup
app.use("/api/data", require("./Routes/DisplayData"));    // data fetching
app.use("/api/profile", require("./Routes/profileRoutes")); // profile management
app.use("/api", require("./Routes/paymentRoutes"));       // payment methods and processing
app.use("/api/orders", require("./Routes/orderRoutes"));  // order management


app.get("/", (req, res) => res.send("Server is running"));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
