import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import contactRoutes from "./routes/contact.route";

dotenv.config();


connectDB();

const app = express();


app.use(express.json());


// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true, 
//   })
// );
const allowedOrigins = [
  "http://localhost:5173", // Vite dev server
  "https://contact-app1-ten.vercel.app/" // replace with actual Vercel URL
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/contacts", contactRoutes);


app.get("/", (req, res) => {
  res.send("API is running...");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

