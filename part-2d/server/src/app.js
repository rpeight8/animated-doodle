const dotenv = require("dotenv").config();
const port = process.env.PORT || 3001;
const connectDB = require("./config/db.js");
const express = require("express");
const mongoose = require("mongoose");
const { errorHandler } = require("./middlewares/error.middleware.js");
const { cors } = require("./middlewares/cors.middleware.js");
const { logger } = require("./middlewares/logging.middleware.js");

async function main() {
  await connectDB();
  const app = express();
  app.use(express.json());
  app.use(cors);
  app.use(logger);
  app.use("/api/lines", require("./routes/line.routes.js"));
  app.use("/api/info", require("./routes/info.routes.js"));
  app.use(errorHandler);

  app.listen(port, function () {
    console.log("listening on 3001");
  });
}

main().catch((err) => console.log("AHAHA"));
