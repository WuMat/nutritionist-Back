import "@babel/polyfill";
import http from "http";
import app from "./app";
import socket from "socket.io";

const PORT = process.env.PORT || 8080;

export const server = http.createServer(app);

const io = socket.listen(server);
io.on("connection", socket => {
  console.log("Client connected");
  io.emit("this", { will: "be received by everyone" });
});

server.listen(PORT);
console.log(`app run, port: ${PORT}`);
