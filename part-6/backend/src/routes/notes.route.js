const express = require("express");

const router = express.Router();

const {
  getNotes,
  createNote,
  updateNote,
} = require("../controllers/notes.controller");

router.route("/").get(getNotes).post(createNote);
router.route("/:id").put(updateNote);
module.exports = router;
