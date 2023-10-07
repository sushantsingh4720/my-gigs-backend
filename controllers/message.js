import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
export const createMessage = async (req, res) => {
  const newMessage = new Message({
    conversationId: req.body.conversationId,
    userId: req.user._id,
    desc: req.body.desc,
  });
  try {
    const savedMessage = await newMessage.save();
    await Conversation.findOneAndUpdate(
      { id: req.body.conversationId },
      {
        $set: {
          readBySeller: req.user.isSeller,
          readByBuyer: !req.user.isSeller,
          lastMessage: req.body.desc,
        },
      },
      { new: true }
    );

    res.status(201).send("message successfully send");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: error.message ? error.message : "Internal Server Error",
    });
  }
};
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.id,
    }).populate("userId", "username img");
    res.status(200).send(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: error.message ? error.message : "Internal Server Error",
    });
  }
};
