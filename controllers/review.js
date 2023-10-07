import Review from "../models/review.model.js";
import Gig from "../models/gig.model.js";

export const createReview = async (req, res, next) => {
  try {
    const review = await Review.findOne({
      gigId: req.body.gigId,
      userId: req.user._id,
    });
    if (review)
      return res.status(403).json({
        error: true,
        message: "You have already created a review for this gig!",
      });

    const newReview = new Review({
      userId: req.user._id,
      gigId: req.body.gigId,
      desc: req.body.desc,
      star: req.body.star,
    });

    //TODO: check if the user purchased the gig.

    const savedReview = await newReview.save();

    await Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });
    res.status(201).send(savedReview);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: error.message ? error.message : "Internal Server Error",
    });
  }
};

export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ gigId: req.params.gigId }).populate(
      "userId",
      "img username country"
    );
    res.status(200).send(reviews);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: error.message ? error.message : "Internal Server Error",
    });
  }
};
export const deleteReview = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
