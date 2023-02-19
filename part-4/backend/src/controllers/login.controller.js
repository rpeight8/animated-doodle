/* eslint-disable no-underscore-dangle */
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const login = asyncHandler(async (req, res) => {
  const { body } = req;
  const { username, password } = body;

  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    res.status(401);
    throw new Error("invalid username or password");
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);
  res.status(200).json({ token, username: user.username, name: user.name });
});

module.exports = login;
