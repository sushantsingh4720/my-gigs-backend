import Gig from "../models/gig.model.js";
export const createGig = async (req, res) => {
  try {
    const gig = await Gig.create({
      userId: req.user._id,
      ...req.body,
    });

    res
      .status(201)
      .json({ success: true, message: "New gig created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: error.message ? error.message : "Internal Server Error",
    });
  }
};
export const deleteGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return res.status(404).json({
        error: true,
        message: "Gig not found",
      });
    }

    if (req.user._id.toHexString() !== gig.userId.toHexString())
      return res
        .status(403)
        .json({ error: true, message: "You can delete only your gig" });
    await Gig.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Gig has been successfully deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: error.message ? error.message : "Internal Server Error",
    });
  }
};
export const getGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id).populate(
      "userId",
      "-password"
    );

    if (!gig) {
      return res.status(404).json({
        error: true,
        message: "Gig not found",
      });
    }
    res.status(200).json({
      success: true,
      gig,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message ? error.message : "Internal Server Error",
    });
  }
};

export const getGigs = async (req, res) => {
  try {
    const { cat, min, max, search, userId, sortBy } = req.query;

    const filter = {
      ...(userId && { userId }),
      ...(cat && { cat }),
      ...((min || max) && {
        price: { ...(min && { $gt: min }), ...(max && { $lt: max }) },
      }),
      ...(search && { title: { $regex: search, $options: "i" } }),
    };

    const gigs = await Gig.find(filter)
      .populate("userId", "username img")
      .sort({ [sortBy]: -1 });

    res.status(200).json({ success: true, gigs });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: error.message ? error.message : "Internal Server Error",
    });
  }
};
