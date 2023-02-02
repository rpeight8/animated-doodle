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
  app.use(express.json());

  app.get("/api/lines/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const line = await Line.findById(id, { __v: 0 });
      res.json(line);
    } catch (err) {
      console.log(err);
      res.statusMessage = "Resource was not found";
      res.status(404).end();
    }
  });

  app.delete("/api/lines/:id", async (req, res) => {
    const id = req.params.id;
    await Line.deleteOne({ _id: id }).then((resp) => {
      console.log(resp);
    });
    res.status(204).end();
  });

  app.get("/api/lines", async (req, res) => {
    const lines = await Line.find({}, { __cv: 0 });
    console.log(lines);
    res.json(lines);
  });

  app.post("/api/lines", async (req, res) => {
    try {
      const body = req.body;
      if (!body) {
        res.status(400).json({
          error: "content missing",
        });
        return;
      }
      if (!body.name || !body.number) {
        res.status(400).json({
          error: "Missing fields",
        });
        return;
      }

      const sameNameLine = await Line.findOne({ name: body.name });
      if (sameNameLine) {
        res.status(400).json({
          error: "Line with same name already exists",
        });
        return;
      }

      const newLine = new Line(body);
      await newLine.validate().catch((err) => {
        throw new Error("Fields validation error");
      });
      res.json(await newLine.save());
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: err.message || "Iternal server error",
      });
    }
  });

  app.get("/api/info", async (req, res) => {
    res.json(await Line.countDocuments({}));
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
