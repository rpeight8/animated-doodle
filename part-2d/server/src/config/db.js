const mongoose = require("mongoose");

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/phoneBookDB";

const connectDB = async () => {
  try {
    console.log(MONGO_URI);
    const connection = await mongoose.connect(MONGO_URI, {
      // useNewUrlParser: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
      // useUnifiedTopology: true,
      // strictQuery: false,
    });
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
