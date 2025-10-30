import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import contactRoutes from "./routes/contact.route";

dotenv.config();

// ✅ Connect to MongoDB
connectDB();

const app = express();

// ✅ Middleware
app.use(express.json());

// ✅ Enable CORS (allow frontend to access API)
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend origin
    credentials: true, // allow cookies/auth headers if needed
  })
);

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/contacts", contactRoutes);

// ✅ Default health check route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

