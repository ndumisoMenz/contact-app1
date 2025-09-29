import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";
import Contact from "./models/contact.model.js";
import mongoose from "mongoose";

import contactRoutes from "./routes/contact.route.js"

dotenv.config();

//entry point to api
const app=express();
const PORT=process.env.PORT || 5000

app.use(express.json()) // enable me to access JSON data in the req.body

app.use("/api/contacts",contactRoutes)

app.listen(PORT,()=>{
    connectDB();
    console.log("Server started at http://localhost:"+PORT)
});

//KvAUbT4M5vsHMdub
