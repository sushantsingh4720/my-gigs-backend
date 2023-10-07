import mongoose, { Schema } from "mongoose";
const conversetionSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    buyerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    readBySeller: {
      type: Boolean,
      required: true,
    },
    readByBuyer: {
      type: Boolean,
      required: true,
    },
    lastMessage: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);
const Conversation = mongoose.model("Conversation", conversetionSchema);
export default Conversation;
