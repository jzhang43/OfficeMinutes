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

/* "join"
  A new socket joins the connection with the server io
*/
io.on("connection", (socket) => {
  socket.emit("update", state);

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

  /* "join_queue"
  User joins the queue with either a private question or public question
  of their own
  */
  socket.on("join_queue", (newQuestion: Question) => {
    const index = state.questions.findIndex(
      (question) => newQuestion.question === question.question
    );

    if (index === -1) {
      state.questions.push(newQuestion);
    } else {
      state.questions[index] = newQuestion;
    }

    io.emit("update", state);
  });

  /* "leave_queue"
  User leaves a question group. 
  If the group contains 0 students, then delete the question
  */
  socket.on("leave_queue", (student: Student) => {
    state.questions.forEach(
      (question) =>
        (question.students = question.students.filter(
          (currStudent) => currStudent.id !== student.id
        ))
    );

    state.questions = state.questions.filter(
      (question) => question.students.length !== 0
    );

    io.emit("update", state);
  });

  /* "in_progress"
    If newQuestion in list, that means its currently marked as waiting.
    Update question in the server state with "in progress"
  */
  socket.on("in_progress", (newQuestion: Question) => {
    const index = state.questions.findIndex(
      (question) => newQuestion.question === question.question
    );

    if (index !== -1) {
      state.questions[index] = newQuestion;
    }

    io.emit("update", state);
  });

  /* "done"
    Marks as question as done, and essentially pops it off from the queue
  */
  socket.on("done", (question: Question) => {
    const questions = state.questions;

    state.questions = [];

    for (const q of questions) {
      if (q.question !== question.question) {
        state.questions.push(q);
      }
    }

    io.emit("update", state);
  });

  /* "add_ta"
    Adds a ta to the list of ta's of the server state.
  */
  socket.on("add_ta", (newTA: Student) => {
    const index = state.tas.findIndex((ta) => ta.name === newTA.name);

    if (index === -1) {
      state.tas.push(newTA);
      console.log("adding TA: ", state.tas);
      io.emit("update", state);
    }
  });

  /* "remove_ta"
    Removes a ta to the list of ta's of the server state
  */
  socket.on("remove_ta", (currTa: Student) => {
    state.tas = state.tas.filter((ta) => currTa.id !== ta.id);

    io.emit("update", state);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
