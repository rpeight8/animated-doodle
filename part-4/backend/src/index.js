const http = require("http");
const app = require("./app");
const { PORT } = require("./config/config");

const server = http.createServer(app);

server.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
});
