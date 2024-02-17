import express, { Request, Response } from "express";
import cors from "cors";
import http from "http";
import socket from "socket.io";

const PORT = process.env.PORT || 8000;

const app = express();
const server = http.createServer();
const io = new socket.Server(server, {
  cors: {
    origin: "*",
  },
});

const users: string[] = [];

app.use(cors());
app.get("/api", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

io.on("connection", (socket) => {
  console.log("User connected");

  users.push(socket.id);

  socket.on("message", ({ message, socketId }) => {
    console.log(users, socketId);
    users
      .filter((id) => socketId !== id)
      .forEach(() => io.sockets.to(socketId).emit("response", message));
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
