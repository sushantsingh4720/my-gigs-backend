import { Router } from "express";
import {
  checkIsSeller,
  authMiddleware,
} from "../middlerware/auth.middleware.js";
import { createGig, deleteGig, getGig, getGigs } from "../controllers/gig.js";
const router = Router();
router.post("/create", authMiddleware, checkIsSeller, createGig);
router.delete("/delete/:id", authMiddleware, checkIsSeller, deleteGig);
router.get("/allGigs", getGigs);
router.get("/SingleGig/:id", authMiddleware, getGig);

export default router;
