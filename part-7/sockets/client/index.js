const socket = io("http://localhost:3001", {});

socket.on("connect", () => {
  console.log("connected to server");
});

socket.on("disconnect", () => {
  console.log("disconnected from server");
});

socket.on("message", (message) => {
  console.log("message from server", message);
});

socket.emit("message", "hi server");

socket.on("noteAdded", (note) => {
  console.log("note added", note);
});
