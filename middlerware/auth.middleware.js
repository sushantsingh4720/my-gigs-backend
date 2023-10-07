import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token)
    return res
      .status(403)
      .json({ error: true, message: "You are not authenticated! " });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(payload._id);
    next();
  } catch (err) {
    // console.log(err.message);
    res
      .status(401)
      .json({ error: true, message: "Access Denied: Invalid token" });
  }
};

export const checkIsSeller = (req, res, next) => {
  if (!req.user.isSeller)
    return res
      .status(403)
      .json({ error: true, message: "Access denied: You are not a seller" });
  next();
};
