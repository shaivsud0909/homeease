import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Routes imports
import AuthRoutes from "./routes/AuthRoutes.js";
import workersRoutes from "./routes/workers.js";
import bookingsRoutes from "./routes/bookings.js";
import usersRoutes from "./routes/users.js";

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "❌ MongoDB connection error:"));
db.once("open", () => console.log("✅ Connected to MongoDB, DB -> Homeease"));

// API Routes
app.use("/api/auth", AuthRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/workers", workersRoutes);
app.use("/api/bookings", bookingsRoutes);

// Serve frontend build
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));