const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const User = require("../models/user.model");

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    url: 1,
    votes: 1,
  });
  res.json(users);
});

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const postUser = asyncHandler(async (req, res) => {
  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(req.body.password, saltRounds);
    req.body.passwordHash = passwordHash;
    const user = new User({ ...req.body });
    const createdUser = await user.save();
    res.status(201).json(createdUser);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400);
    }

    throw error;
  }
});

const putUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.username = req.body.username || user.username;
    user.name = req.body.name || user.name;
    user.password = req.body.password || user.password;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const deleteUsers = asyncHandler(async (req, res) => {
  await User.deleteMany({});
  res.json({ message: "All users removed" });
});

module.exports = {
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
  deleteUsers,
};
