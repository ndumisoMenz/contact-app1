import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/dbConnect";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";

// Load environment variables
dotenv.config();

const app = express();

// Connect to databases
dbConnect();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Start the server
const PORT = process.env.PORT || 7002;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
