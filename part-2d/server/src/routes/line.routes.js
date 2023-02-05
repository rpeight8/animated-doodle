const express = require("express");

const router = express.Router();

const {
  getLines,
  getLine,
  deleteLine,
  addLine,
  countLines,
  updateLine,
} = require("../controllers/lines.controller");

router.route("/").get(getLines).post(addLine);
router.route("/:id").get(getLine).put(updateLine).delete(deleteLine);

router.get("/info", countLines);

module.exports = router;
