const path = require("path");
/* eslint-disable-next-line no-unused-vars */
const dotenv = require("dotenv").config();
const express = require("express");

const connectDB = require("./config/db");
const blogRoutes = require("./routes/blog.routes");
const { errorHandler } = require("./middlewares/error.middleware");
const { cors } = require("./middlewares/cors.middleware");
const { logger } = require("./middlewares/logging.middleware");

const port = process.env.PORT || 3001;

async function launch() {
  await connectDB();
  const app = express();
  app.use("/", express.static(path.join(__dirname, "public")));
  app.use(express.json());
  app.use(cors);
  app.use(logger);
  app.use("/api/blogs", blogRoutes);
  app.use(errorHandler);

  app.listen(port, () => {
    console.log(`listening on ${port}`);
  });
}

launch().catch((err) => console.log(err));
