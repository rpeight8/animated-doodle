const mongoose = require("mongoose");

const LineSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true,
  },
  number: Number,
});

LineSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.__v;
  },
});

const Line = mongoose.model("Line", LineSchema);

module.exports = {
  Line,
};
