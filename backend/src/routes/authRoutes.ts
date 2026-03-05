import express from "express";
import { register, login, logout, getProfile } from "../controllers/authController";
import verifyToken from "../middlewares/authMiddleware";

const router = express.Router();

// Auth routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", verifyToken, getProfile);

export default router;
