const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("connected to client");
  socket.on("disconnect", () => {
    console.log("disconnected from client");
  });
  socket.on("message", (message) => {
    console.log("message from client", message);
  });
  socket.emit("message", "hi client");
});

server.listen(3001, () => {
  console.log("listening on *:3001");
});
