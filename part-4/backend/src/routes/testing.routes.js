const express = require("express");

const router = express.Router();
const resetAll = require("../controllers/testing.controller");

router.route("/").post(resetAll);

module.exports = router;
