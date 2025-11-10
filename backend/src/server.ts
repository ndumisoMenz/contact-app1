import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import contactRoutes from "./routes/contact.route";

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());

// ✅ CORS configuration
const allowedOrigins = [
  "http://localhost:5173", // Local Vite dev server
  "https://contact-app1-ten.vercel.app" // Deployed frontend URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like curl or mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.warn(`❌ CORS blocked for origin: ${origin}`);
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allows cookies/auth headers if needed
  })
);

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/contacts", contactRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
