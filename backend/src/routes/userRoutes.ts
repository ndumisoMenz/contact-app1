import express, { Request, Response } from "express";
import verifyToken from "../middlewares/authMiddleware";
import authorizeRoles from "../middlewares/roleMiddleware";
import { getAllUsers, updateUserRole } from "../controllers/userController";

const router = express.Router();

// Only admin can access this route
router.get(
  "/admin",
  verifyToken,
  authorizeRoles("admin"),
  (req: Request, res: Response) => {
    res.json({ message: "Welcome Admin" });
  }
);

// Both admin and manager can access this route
router.get(
  "/manager",
  verifyToken,
  authorizeRoles("admin", "manager"),
  (req: Request, res: Response) => {
    res.json({ message: "Welcome Manager" });
  }
);

// All roles can access this route
router.get(
  "/user",
  verifyToken,
  authorizeRoles("admin", "manager", "user"),
  (req: Request, res: Response) => {
    res.json({ message: "Welcome User" });
  }
);

// Admin Management Routes
router.get("/", verifyToken, authorizeRoles("admin"), getAllUsers);
router.patch("/:id/role", verifyToken, authorizeRoles("admin"), updateUserRole);

export default router;
