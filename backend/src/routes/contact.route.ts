import express from "express";
import verifyToken from "../middlewares/authMiddleware";
import authorizeRoles from "../middlewares/roleMiddleware";
import { createContact, updateContact, getContacts, deleteContact } from "../controllers/contact.controller";

const router = express.Router();

router.get("/",verifyToken,authorizeRoles("admin","user"), getContacts);
router.post("/",verifyToken,authorizeRoles("admin"), createContact);
router.put("/:id",verifyToken,authorizeRoles("admin"), updateContact);
router.delete("/:id",verifyToken,authorizeRoles("admin"), deleteContact);

export default router;
