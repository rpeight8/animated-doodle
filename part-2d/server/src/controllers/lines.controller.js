const { Line } = require("../models/line.model");
const asyncHandler = require("express-async-handler");

const getLines = asyncHandler(async (req, res) => {
  res.json(await Line.find({}, { __v: 0 }));
});

const getLine = asyncHandler(async (req, res) => {
  const id = req.params.id;
  let line;
  try {
    line = await Line.findById(id, { __v: 0 });
  } catch (err) {
    res.status(500);
    throw new Error("Iternal server error");
  }

  if (!line) {
    res.status(404);
    throw new Error("Resource was not found");
  }
  res.json(line);
});

const deleteLine = asyncHandler(async (req, res) => {
  const id = req.params.id;
  await Line.deleteOne({ _id: id });
  res.status(204).end();
});

const addLine = asyncHandler(async (req, res, next) => {
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

const countLines = asyncHandler(async (req, res) => {
  res.json(await Line.countDocuments({}));
});

module.exports = {
  getLines,
  getLine,
  deleteLine,
  addLine,
  countLines,
};
