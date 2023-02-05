const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

morgan.token("data", function (req) {
  return JSON.stringify(req.body);
});

const logger = morgan(
  function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      "response-time",
      tokens.data(req, res),
    ].join(" ");
  },
  {
    stream: fs.createWriteStream(path.join(__dirname, "requests.log"), {
      flags: "a",
    }),
  }
);

module.exports = { logger };
