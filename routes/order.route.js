import { Router } from "express";
const router = Router();
import {
  allOrders,
  paymentIntent,
  confirmOrder,
} from "../controllers/order.js";
router.post("/create-payment-intent/:id", paymentIntent);
// router.post("/:id", createOrder);
router.put("/", confirmOrder);
router.get("/", allOrders);
export default router;
