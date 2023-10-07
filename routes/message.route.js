import { Router } from "express";
import { createMessage, getMessages } from "../controllers/message.js";
const router = Router();
router.post("/create", createMessage);
router.get("/:id", getMessages);
export default router;
