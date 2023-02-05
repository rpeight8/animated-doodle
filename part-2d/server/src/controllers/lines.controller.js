const { Line } = require("../models/line.model");
const asyncHandler = require("express-async-handler");

const getLines = asyncHandler(async (req, res) => {
  res.json(await Line.find({}, { __v: 0 }));
});

const getLine = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const line = await Line.findById(id, { __v: 0 });

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

const addLine = asyncHandler(async (req, res) => {
  const body = req.body;

  if (await Line.findOne({ name: body?.name })) {
    res.status(400);
    throw new Error("Same person already exists");
  }

  const newLine = new Line(body);

  res.json(await newLine.save());
});

const countLines = asyncHandler(async (req, res) => {
  res.json(await Line.countDocuments({}));
});

const updateLine = asyncHandler(async (req, res) => {
  const id = req?.params?.id;
  const body = req?.body;

  await Line.findByIdAndUpdate(id, body, {
    runValidators: true,
    new: true,
    context: "query",
  }).then((line) => {
    if (!line) {
      res.status(404);
      throw new Error("Resource was not found");
    }
    res.json(line);
  });
});

module.exports = {
  getLines,
  getLine,
  deleteLine,
  addLine,
  countLines,
  updateLine,
};
