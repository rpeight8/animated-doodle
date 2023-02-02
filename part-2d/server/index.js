const { response } = require("express");
const express = require("express");
const mongoose = require("mongoose");

const { Line } = require("./models/line.js");

const app = express();

mongoose.set("strictQuery", false);
const mongoDB = "mongodb://127.0.0.1/phoneBookDB";

async function main() {
  await mongoose.connect(mongoDB);

  app.use((req, res, next) => {
    res.append("Access-Control-Allow-Origin", ["*"]);
    res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.append("Access-Control-Allow-Headers", "Content-Type");
    next();
  });

  app.get("/api/lines", async (req, res) => {
    const lines = await Line.find({}, { __v: 0 });
    console.log(lines);
    res.json(lines);
  });

  app.listen(3001, function () {
    console.log("listening on 3001");
  });
}

main()
  .then(async () => {
    // const john = new Line({ name: "John", number: 123 });
    // await john.save();
  })
  .catch((err) => console.log(err));
