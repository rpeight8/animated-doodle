const express = require("express");

const router = express.Router();

const { getInfo } = require("../controllers/info.controller");

router.get("/", getInfo);

module.exports = router;
