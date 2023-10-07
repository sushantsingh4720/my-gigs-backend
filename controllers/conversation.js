import Conversation from "../models/conversation.model.js";
export const createConversation = async (req, res) => {
  try {
    const { sellerId, buyerId } = req.body;
    const conversation = new Conversation({
      id: sellerId + buyerId,
      sellerId,
      buyerId,
      readBySeller: req.user.isSeller,
      readByBuyer: !req.user.isSeller,
    });
    const createdConversation = await conversation.save();
    res.status(200).json({ success: true, createdConversation });
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      error: true,
      message: error.message ? error.message : "Internal Server Error",
    });
  }
};
export const updateConversation = async (req, res) => {
  try {
    const updatedConversation = await Conversation.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: {
          // readBySeller: true,
          // readByBuyer: true,
          ...(req.user.isSeller
            ? { readBySeller: true }
            : { readByBuyer: true }),
        },
      },
      { new: true }
    )
      .populate("sellerId", "username img")
      .populate("buyerId", "username img");

    res.status(200).send(updatedConversation);
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      error: true,
      message: error.message ? error.message : "Internal Server Error",
    });
  }
};
export const getSingleConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({ id: req.params.id })
      .populate("sellerId", "username img")
      .populate("buyerId", "username img");
    if (!conversation)
      return res
        .status(404)
        .json({ error: true, message: "conversation not found" });
    res.status(200).json({ success: true, conversation });
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      error: true,
      message: error.message ? error.message : "Internal Server Error",
    });
  }
};
export const getAllConversation = async (req, res) => {
  try {
    const allConversation = await Conversation.find(
      req.user.isSeller ? { sellerId: req.user._id } : { buyerId: req.user._id }
    )
      .populate("sellerId", "username img")
      .populate("buyerId", "username img")
      .sort({ updatedAt: -1 });
    res.status(200).json(allConversation);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: error.message ? error.message : "Internal Server Error",
    });
  }
};
