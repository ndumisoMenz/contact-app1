import { Request, Response } from "express";
import User from "../models/userModel";

// Get all users (Admin only)
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find({}, "-password").populate("contacts");
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch users" });
    }
};

// Update user role (Admin only)
export const updateUserRole = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        if (!["admin", "user"].includes(role)) {
            res.status(400).json({ message: "Invalid role" });
            return;
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { role },
            { new: true, runValidators: true }
        ).select("-password");

        if (!updatedUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.status(200).json(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to update role" });
    }
};
