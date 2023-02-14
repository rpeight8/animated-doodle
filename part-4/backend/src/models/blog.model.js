/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  author: {
    type: String,
    index: true,
    required: [true, "Author name required"],
  },
  title: {
    type: String,
    required: [true, "Title required"],
    minLength: [5, "Title must be at least 5 characters long"],
    maxLength: [50, "Title must be at most 50 characters long"],
  },
  url: {
    type: String,
    required: [true, "URL required"],
  },
  votes: {
    type: Number,
    minValue: [0, "Votes must be at least 0"],
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

BlogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.__v;
    delete returnedObject._id;
  },
});

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
