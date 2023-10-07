import { Router } from "express";
const router = Router();
import { createReview, getReviews } from "../controllers/review.js";
router.post("/", createReview);
router.get("/:gigId", getReviews);

export default router;
