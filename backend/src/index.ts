import express, { Request, Response } from "express";
import cors from "cors";
import http from "http";
import socket from "socket.io";
import { OfficeHour, Question } from "../types";

interface Connection {
  name: string;
  id: string;
  socket: string;
}

const PORT = process.env.PORT || 8000;

const app = express();
const server = http.createServer();
const io = new socket.Server(server, {
  cors: {
    origin: "*",
  },
});

let connections: Connection[] = [];

const state: OfficeHour = {
  questions: [],
  tas: [],
  location: "",
};

app.use(cors());
app.get("/api", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

io.on("connection", (socket) => {
  socket.on(
    "join",
    ({ name, id, socket }: { name: string; id: string; socket: string }) => {
      console.log(`User ${name} joining`);
      if (connections.find((connection) => connection.id === id) == undefined) {
        connections.push({ name, id, socket });
      }
      console.log(connections);
    }
  );

  socket.on("join_queue", (newQuestion: Question) => {
    const index = state.questions.findIndex(
      (question) => newQuestion.question === question.question
    );

    if (index === -1) {
      state.questions.push(newQuestion);
    } else {
      state.questions[index] = newQuestion;
    }

    socket.emit("join_queue_res");
  });

  // console.log("User connected" + socket.id);

  // users.push(socket.id);

  // socket.on("join", ({ id }) => {
  //   console.log("User ", id, "joined");
  // });

  // socket.on("oh_req", ({ message, socketId }) => {
  //   console.log("Hello", users, socketId);
  //   users
  //     .filter((id) => socketId !== id)
  //     .forEach(() => io.sockets.to(socketId).emit("oh_res", message));
  // });

  // socket.on("on_reload", ({ socketId }) => {
  //   users = users.filter((id) => socketId !== id);
  //   // console.log(users);
  // });

  // socket.on("join", () => {
  //   console.log("Connecting");
  //   users.forEach((user) => io.sockets.to(user).emit("update", []));
  // });

  // socket.on("join_queue", ({ socketId, new_question }) => {
  //   queue.push(new_question);
  //   // console.log("Server Q" + queue);
  //   console.log("First: ", queue[0]);
  //   users.forEach(() => io.sockets.to(socketId).emit("join_queue_res", queue));
  //   // .filter((id) => socketId !== id)
  //   // .forEach(() => io.sockets.to(socketId).emit("join_queue_res", queue));
  // });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
