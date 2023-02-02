const express = require("express");
const mongoose = require("mongoose");

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
  app.listen(3001, function () {
    console.log("listening on 3001");
  });
}

main()
  .then(async () => {
    const numbers = new mongoose.Schema({
      name: String,
      number: Number,
    });
    const Line = mongoose.model("Line", numbers);
    const john = new Line({ name: "John", number: 123 });
    await john.save();
  })
  .catch((err) => console.log(err));
