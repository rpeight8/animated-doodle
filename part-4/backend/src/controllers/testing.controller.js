/* eslint-disable no-underscore-dangle */
const asyncHandler = require("express-async-handler");
const Blog = require("../models/blog.model");
const User = require("../models/user.model");

const resetBlogs = asyncHandler(async (req, res) => {
  await Blog.deleteMany({});
  res.status(204);
});

const resetUsers = asyncHandler(async (req, res) => {
  await User.deleteMany({});
  res.status(204);
});

const resetAll = asyncHandler(async (req, res) => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  res.status(204);
  res.end();
});

module.exports = resetAll;
