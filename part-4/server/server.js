const express = require("express");
const fs = require("fs/promises");

const app = express();

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/data", function (req, res) {
  fs.readFile("./data/data.json").then((data) => {
    res.send(JSON.parse(data));
  });
});

app.listen(3001, function () {
  console.log("listening on 3001");
});
