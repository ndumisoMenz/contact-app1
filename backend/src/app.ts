// import express from "express";
// import cors from "cors";
// import contactRoutes from "./routes/contact.route";

// const app = express();

// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://contact-9rcni3meu-ndumisomenzs-projects.vercel.app"
// ];

// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       return callback(null, true);
//     }
//     return callback(new Error("CORS not allowed"), false);
//   },
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));

// app.use(express.json());
// app.use("/api/contacts", contactRoutes);

// export default app;


import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import dbConnect from "./config/dbConnect";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import contactRoutes from "./routes/contact.route";

dotenv.config();

const app = express();
dbConnect();

// CORS setup
const allowedOrigins = [
  "http://localhost:5173",
  "https://contact-9rcni3meu-ndumisomenzs-projects.vercel.app"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS not allowed"), false);
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/contacts", contactRoutes);


export default app;
