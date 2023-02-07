const path = require("path");
/* eslint-disable-next-line no-unused-vars */
const express = require("express");
const mongoose = require("mongoose");

const config = require("./config/config");
const blogRoutes = require("./routes/blog.routes");
const { errorHandler } = require("./middlewares/error.middleware");
const { cors } = require("./middlewares/cors.middleware");
const { logger } = require("./middlewares/logging.middleware");

mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(config.MONGODB_URI);
    console.log(`Connected to MongoDB: ${connection.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

connectDB();

const app = express();
app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors);
app.use(logger);
app.use("/api/blogs", blogRoutes);
// app.use(errorHandler);

module.exports = app;
