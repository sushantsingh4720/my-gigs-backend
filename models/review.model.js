import mongoose, { Schema } from "mongoose";
const reviewSchema = new Schema(
  {
    gigId: {
      type: Schema.Types.ObjectId,
      ref: "Gig",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    star: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5],
    },
    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Review = mongoose.model("Review", reviewSchema);
export default Review;
