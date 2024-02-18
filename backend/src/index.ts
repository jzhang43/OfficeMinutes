import express, { Request, Response } from "express";
import cors from "cors";
import http from "http";
import socket from "socket.io";
import { OfficeHour, Question, Student } from "../types";

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

    console.log("progress state:", state.questions[0].status);

    io.emit("update", state);
  });

  /*
      Leaving a queue from student POV
      Mark as done removes Question from Questions[]
  */
  socket.on("leave_queue", (oldQuestion: Question) => {
    if (oldQuestion.students.length === 0) {
      state.questions = state.questions.filter(
        (question) => question.question !== oldQuestion.question
      );
    } else {
      const index = state.questions.findIndex(
        (question) => oldQuestion.question === question.question
      );
      state.questions[index] = oldQuestion;
      console.log(state.questions[index].students);
    }
    io.emit("update", state);
  });

  /*
    If newQuestion in list, that means its currently marked as waiting,
    then just update with newQuestion
  */
  socket.on("in_progress", (newQuestion: Question) => {
    const index = state.questions.findIndex(
      (question) => newQuestion.question === question.question
    );

    if (index !== -1) {
      state.questions[index] = newQuestion;

      console.log("progress state:", state.questions[index].status);
    }

    io.emit("update", state);
  });

  socket.on("add_ta", (newTA: Student) => {
    state.tas.push(newTA);
    console.log("adding TA: ", state.tas);
    io.emit("update", state);
  });

  socket.on("remove_ta", (currTa: Student) => {
    state.tas = state.tas.filter((ta) => currTa.id !== ta.id);

    io.emit("update", state);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
