import Gig from "../models/gig.model.js";
import Order from "../models/order.model.js";
import Stripe from "stripe";

export const paymentIntent = async (req, res) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const gig = await Gig.findById(req.params.id);
    const oldGig = await Order.findOne({
      $and: [
        { gigId: gig._id },
        { buyerId: req.user._id },
        { isCompleted: false },
      ],
    });

    if (oldGig) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: gig.price * 100,
        currency: "inr",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
          enabled: true,
        },
      });
      oldGig.payment_intent = paymentIntent.id;
      await oldGig.save();

      return res
        .status(201)
        .send({ clientSecret: paymentIntent.client_secret });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: gig.price * 100,
      currency: "inr",
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });
    const order = new Order({
      gigId: gig._id,
      img: gig.cover,
      title: gig.title,
      price: gig.price,
      sellerId: gig.userId,
      buyerId: req.user._id,
      payment_intent: paymentIntent.id,
    });
    await order.save();

    res.status(201).send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: error.message ? error.message : "Internal Server Error",
    });
  }
};
export const confirmOrder = async (req, res) => {
  try {
    const orders = await Order.findOneAndUpdate(
      {
        payment_intent: req.body.payment_intent,
      },
      {
        $set: {
          isCompleted: true,
        },
      }
    );
    await Gig.findByIdAndUpdate(orders.gigId, {
      $inc: { sales: 1 },
    });

    res.status(200).send("Order has been confirmed.");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: error.message ? error.message : "Internal Server Error",
    });
  }
};
// export const createOrder = async (req, res) => {
//   try {
//     const gig = await Gig.findById(req.params.id);
//     const order = new Order({
//       gigId: gig._id,
//       img: gig.cover,
//       title: gig.title,
//       price: gig.price,
//       sellerId: gig.userId,
//       buyerId: req.user._id,
//       payment_intent: "payment",
//     });
//     await order.save();
//     res
//       .status(201)
//       .json({ success: true, message: "Your order has been created" });
//   } catch (error) {
//     // console.log(error);
//     res.status(500).json({
//       error: true,
//       message: error.message ? error.message : "Internal Server Error",
//     });
//   }
// };
export const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      ...(req.user.isSeller
        ? { sellerId: req.user._id }
        : { buyerId: req.user._id }),
      isCompleted: true,
    });
    res.status(200).json(orders);
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      error: true,
      message: error.message ? error.message : "Internal Server Error",
    });
  }
};
