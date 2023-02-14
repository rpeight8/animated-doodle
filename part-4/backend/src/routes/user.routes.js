const express = require("express");

const router = express.Router();
const {
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
  deleteUsers,
} = require("../controllers/user.controller");

router.route("/").get(getUsers).delete(deleteUsers).post(postUser);
router.route("/:id").get(getUser).put(putUser).delete(deleteUser);

module.exports = router;
