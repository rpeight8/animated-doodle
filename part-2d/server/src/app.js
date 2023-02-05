const path = require("path");
/* eslint-disable-next-line no-unused-vars */
const dotenv = require("dotenv").config();

const port = process.env.PORT || 3001;
const express = require("express");
const connectDB = require("./config/db");
const { errorHandler } = require("./middlewares/error.middleware");
const { cors } = require("./middlewares/cors.middleware");
const { logger } = require("./middlewares/logging.middleware");
const lineRoutes = require("./routes/line.routes");
const infoRoutes = require("./routes/info.routes");

async function main() {
  const app = express();
  await connectDB();
  app.use(cors);
  app.use("/", express.static(path.join(__dirname, "public")));
  app.use(express.json());
  app.use(logger);
  app.use("/api/lines", lineRoutes);
  app.use("/api/info", infoRoutes);
  app.use(errorHandler);

  app.listen(port, () => {
    console.log(`listening on ${port}`);
  });
}

main().catch((err) => console.log(err));
