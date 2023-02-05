/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require("mongoose");

const LineSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true,
    required: [true, "Person name required"],
  },
  number: {
    type: String,
    required: [true, "Person phone number required"],
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
});

LineSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.__v;
  },
});

const Line = mongoose.model("Line", LineSchema);

module.exports = {
  Line,
};
