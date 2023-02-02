const mongoose = require("mongoose");

const LineSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true,
  },
  number: Number,
});

const Line = mongoose.model("Line", LineSchema);

module.exports = {
  Line,
};
