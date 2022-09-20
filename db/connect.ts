import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/jobs");
    console.log(`mongoDB Connected : ${conn.connection.host}`);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};
export default connectDB;

module.exports = connectDB;
