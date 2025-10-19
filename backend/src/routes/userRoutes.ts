import express, { Request, Response } from "express";
import verifyToken from "../middlewares/authMiddleware";
import authorizeRoles from "../middlewares/roleMiddleware";

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

export default router;
