import User from "../models/user.model.js";
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).json({ error: true, message: "user not found" });
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: error.message ? error.message : "Internal Server Error",
    });
  }
};

export const myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { password, ...userInfo } = user._doc;
    res.status(200).json({ success: true, user: userInfo });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: error.message ? error.message : "Internal Server Error",
    });
  }
};
