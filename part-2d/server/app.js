const fs = require("fs");
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const { Line } = require("./models/line.js");

const app = express();
app.use(express.json());
// app.use(morgan(":method :url :status :response-time ms :req[body]"));
morgan.token("data", function (req, res) {
  return JSON.stringify(req.body);
});
app.use(
  morgan(
    function (tokens, req, res) {
      return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        "response-time",
        tokens.data(req, res),
      ].join(" ");
    },
    {
      stream: fs.createWriteStream(path.join(__dirname, "requests.log"), {
        flags: "a",
      }),
    }
  )
);

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
    await Line.deleteOne({ _id: id });
    res.status(204).end();
  });

  app.get("/api/lines", async (req, res) => {
    res.json(await Line.find({}, { __cv: 0 }));
  });

  app.post("/api/lines", async (req, res, next) => {
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

      if (await Line.findOne({ name: body.name })) {
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

main().catch((err) => console.log(err));
