const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors"); // Importing CORS

dotenv.config();
connectDB();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors()); // This will allow all origins
app.use(express.json({ limit: "50mb" }));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5001;
let server;
connectDB().then(async () => {
  server = app.listen(PORT, () => {
    console.log(`Server running on port http://127.0.0.1:${PORT}`);
  });
});
