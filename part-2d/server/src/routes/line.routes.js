const express = require("express");
const router = express.Router();

const {
  getLines,
  getLine,
  deleteLine,
  addLine,
  countLines,
} = require("../controllers/lines.controller.js");

router.route("/").get(getLines).post(addLine);
router.route("/:id").get(getLine).delete(deleteLine);

router.get("/info", countLines);

module.exports = router;
