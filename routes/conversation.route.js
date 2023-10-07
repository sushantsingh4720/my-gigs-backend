import { Router } from "express";
import {
  createConversation,
  getAllConversation,
  getSingleConversation,
  updateConversation,
} from "../controllers/conversation.js";
const router = Router();
router.post("/create", createConversation);
router.get("/sigle/:id", getSingleConversation);
router.get("/all", getAllConversation);
router.put("/update/:id", updateConversation);
export default router;
