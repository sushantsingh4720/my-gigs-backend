import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  try {
    const { password } = req.body;
    const hashPassword = await bcrypt.hash(password, +process.env.SALT);

    const user = new User({
      ...req.body,
      password: hashPassword,
    });
    await user.save();

    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      error: true,
      message: error.message ? error.message : "Internal Server Error",
    });
  }
};
export const login = async (req, res) => {
  try {
    const { username } = req.body;

    const user = await User.findOne({ username });

    if (!user)
      return res.status(404).json({ error: true, message: "User not found!" });
    const isCorrect = bcrypt.compareSync(req.body.password, user.password);

    if (!isCorrect)
      return res
        .status(401)
        .json({ error: true, message: "Username or Password incorrect!" });
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    const { password, ...info } = user._doc;

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ success: true, message: "Login successfully", info });
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      error: true,
      message: error.message ? error.message : "Internal Server Error",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res
      .clearCookie("accessToken", {
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json({ success: true, message: "User logged out!" });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message ? error.message : "Internal Server Error",
    });
  }
};
