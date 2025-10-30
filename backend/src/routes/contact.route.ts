import express from "express";
import { createContact, updateContact, getContacts,getContactsByRole, deleteContact, getUserContacts } from "../controllers/contact.controller";
import  authMiddleware  from "../middlewares/authMiddleware";


const router = express.Router();

//router.get("/", getContacts);
router.get("/", authMiddleware, getContactsByRole);
router.post("/",authMiddleware,createContact);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);
router.get("/:id",getUserContacts)

export default router;
