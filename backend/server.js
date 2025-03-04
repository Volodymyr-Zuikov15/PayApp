const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();
connectDB();

const authRoutes = require("./routes/authRoutes");
const fundsRoutes = require("./routes/fundsRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes"); // Admin Part
const { createDefaultUser } = require('./config/adminUser'); // Admin Part
createDefaultUser(); // Admin User Create

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/funds", fundsRoutes);
app.use("/api/user", userRoutes);
app.use("/api/mapex/admin", adminRoutes); // Admin Part

const PORT = process.env.PORT || 9001;
let server;
connectDB().then(async () => {
  server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${process.env.SERVER_URL || "http://mapex.fun"}:${PORT}`);
  });
});
