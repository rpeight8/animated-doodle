require("dotenv").config();

const { PORT, MONGODB_URI, SECRET } = process.env;
module.exports = {
  MONGODB_URI,
  PORT,
  SECRET,
};
