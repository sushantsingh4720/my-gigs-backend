import mongoose, { Schema } from "mongoose";
const messageSchema = new Schema(
  {
    conversationId: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Message = mongoose.model("Message", messageSchema);
export default Message;
