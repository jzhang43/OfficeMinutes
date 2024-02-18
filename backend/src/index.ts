import express, { Request, Response } from "express";
import cors from "cors";
import http from "http";
import socket from "socket.io";
import { Question } from "../../frontend/src/app/types/socketState";

const PORT = process.env.PORT || 8000;

const app = express();
const server = http.createServer();
const io = new socket.Server(server, {
  cors: {
    origin: "*",
  },
});

let users: string[] = [];
const queue: Question[] = [];

app.use(cors());
app.get("/api", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

io.on("connection", (socket) => {
  console.log("User connected" + socket.id);

  users.push(socket.id);

  socket.on("oh_req", ({ message, socketId }) => {
    console.log(users, socketId);
    users
      .filter((id) => socketId !== id)
      .forEach(() => io.sockets.to(socketId).emit("oh_res", message));
  });

  socket.on("on_reload", ({ socketId }) => {
    users = users.filter((id) => socketId !== id);
    // console.log(users);
  });

  socket.on("join_queue", ({ socketId, new_question }) => {
    queue.push(new_question);
    // console.log("Server Q" + queue);
    console.log("First: ", queue[0]);
    users.forEach(() => io.sockets.to(socketId).emit("join_queue_res", queue));
    // .filter((id) => socketId !== id)
    // .forEach(() => io.sockets.to(socketId).emit("join_queue_res", queue));
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
