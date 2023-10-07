import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/connectDB.js";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import gigRoute from "./routes/gig.route.js";
import reviewRoute from "./routes/review.route.js";
import orderRoute from "./routes/order.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
import { authMiddleware } from "./middlerware/auth.middleware.js";

const app = express();
config();
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "API is working" });
});
app.use("/api/auth", authRoute);
app.use("/api/gig", gigRoute);
// app.use(authMiddleware);
app.use("/api/user", userRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
const port = process.env.PORT;
app.listen(port, (req, res) => {
  console.log(`Server is running on http://localhost:${port}`);
});
