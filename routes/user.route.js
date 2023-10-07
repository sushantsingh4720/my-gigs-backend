import { Router } from "express";
import { getUser, myProfile } from "../controllers/user.js";
const router = Router();
router.get("/me", myProfile);
router.get("/:id", getUser);
export default router;
