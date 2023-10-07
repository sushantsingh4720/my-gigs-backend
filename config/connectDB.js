import mongoose from "mongoose";
const connectDB = (req, res) => {
  const connectionParams = { useNewUrlParser: true };

  mongoose
    .connect(process.env.DATABASE_URL, connectionParams)
    .then(() => {
      console.log("Connected to Mongoose server");
    })
    .catch((error) => {
      console.error(`Error connecting to MongoDB server: ${error.message}`);
    });
};
export default connectDB;
