import { Request, Response } from "express";
import mongoose from "mongoose";
import Contact, { IContact } from "../models/contact.model";
import User from "../models/userModel";

export const getContacts = async (
  req: Request & { user?: { id: string; role: string } },
  res: Response
): Promise<void> => {
  try {
    let contacts: IContact[] = [];

    if (!req.user) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    
    if (req.user.role === "admin") {
      contacts = await Contact.find({});
    } else {
      contacts = await Contact.find({ user: req.user.id });
    }

    if (!contacts || contacts.length === 0) {
      res.status(404).json({ success: false, message: "No contacts found" });
      return;
    }

    res.status(200).json({ success: true, data: contacts });
  } catch (error: any) {
    console.error("Error fetching contacts:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const createContact = async (
  req: Request<{}, {}, IContact>,
  res: Response
): Promise<void> => {
  const { name, email, phone, notes } = req.body;

  // Validate required fields
  if (!name || !email || !phone || !notes) {
    res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
    return;
  }

  try {
    // Get current user ID from authMiddleware
    const userId = req.user?.id;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    // Find user in database
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    // Create new contact
    const newContact = new Contact({
      name,
      email,
      phone,
      notes,
      user: user._id, // assign contact to logged-in user
    });

    await newContact.save();

    // Add contact reference to user
    user.contacts.push(newContact._id);
    await user.save();

    res.status(201).json({ success: true, data: newContact });
  } catch (error: any) {
    console.error("Error creating contact:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateContact = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ success: false, message: "Invalid Contact Id" });
    return;
  }

  try {
    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ success: true, data: updatedContact });
  } catch (error: any) {
    console.error("Error updating contact:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteContact = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ success: false, message: "Invalid Contact Id" });
    return;
  }

  try {
    await Contact.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Contact deleted" });
  } catch (error: any) {
    console.error("Error deleting contact:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getUserContacts = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ success: false, message: "Invalid User" });
    return;
  }

  try {
    const contacts: IContact[] = await Contact.find({ user: id });

    if (!contacts || contacts.length === 0) {
      res
        .status(404)
        .json({ success: false, message: "No contacts found for this user" });
      return;
    }

    res.status(200).json({ success: true, data: contacts });
  } catch (error: any) {
    console.error("Error fetching user contacts:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

export const getContactsByRole = async (
  req: Request & { user?: { id: string; role: string } },
  res: Response
) => {
  try {
    let contacts: IContact[];

    if (req.user?.role === "admin") {
      // Admin sees all contacts
      contacts = await Contact.find({});
    } else {
      // Regular user sees only their contacts
      contacts = await Contact.find({ user: req.user?.id });
    }

    if (!contacts || contacts.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No contacts found" });
    }

    res.status(200).json({ success: true, data: contacts });
  } catch (err: any) {
    console.error("Error fetching contacts:", err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
