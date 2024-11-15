import { Router } from "express";
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContact,
  updateContact,
} from "../controllers/contactController.js";

const router = Router();

router.get("/", getAllContacts);
router.post("/", createContact);
router.get("/:id", getContact);
router.patch("/:id", updateContact);
router.delete("/:id", deleteContact);

export default router;
