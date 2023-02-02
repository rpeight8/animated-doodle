const { Line } = require("../models/line.model");
const asyncHandler = require("express-async-handler");

const getInfo = asyncHandler(async (req, res) => {
  res.json(await Line.count({}));
});

module.exports = {
  getInfo,
};
