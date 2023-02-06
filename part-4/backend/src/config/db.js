const mongoose = require("mongoose");

const MONGO_URI =
  process.env.NODE_ENV === "test"
    ? process.env.MONGODB_URI_TEST
    : process.env.MONGODB_URI;

console.log(MONGO_URI);

const connectDB = async () => {
  try {
    console.log(MONGO_URI);
    const connection = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
