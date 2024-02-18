import { useSession } from "next-auth/react";
import React from "react";
import { connect } from "socket.io-client";
import { type OfficeHour, Question, Student } from "@/types";
import { redirect } from "next/navigation";

interface UseWsProps {
  url: string;
}

export const useWs = ({ url }: UseWsProps) => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => {
      redirect("/");
    },
  });

  const [state, setState] = React.useState<OfficeHour>({
    questions: [],
    tas: [],
    location: "",
  });
  const [student, setStudent] = React.useState<Student | null>(null);

  const ws = React.useRef<null | ReturnType<typeof connect>>(null);

  // const on = {
  //   oh: (message, id) => {

  //   }
  // }

  React.useEffect(() => {
    if (session?.user == undefined) {
      return;
    }

    const socket = connect(url);

    const newStudent: Student = {
      name: session?.user.name,
      id: session?.user.id,
      socket: socket.id ?? "",
    };

    if (student === null) {
      setStudent(newStudent);
    }

    // socket.on("connect", () => {
    //   socket.emit("join", {
    //     name: newStudent.name,
    //     id: newStudent.id,
    //     socket: newStudent.socket,
    //   });
    //   // setStudent(newStudent);
    // });

    // socket.on("close", () => setIsReady(false));

    socket.on("update", (state) => {
      console.log("State update", state);
      setState(state);
    });

    // socket.emit("fetch");
    // socket.onmessage = (event) => setVal(event.data);

    // socket.on("join_queue", ({ socketId, new_question }) => {
    //   socket.emit("join_queue_req", {socketId, new_question})
    //   queue.push(new_question);

    //   // console.log("Server Q" + queue);
    //   console.log("First: ", queue[0]);
    //   users.forEach(() =>
    //     io.sockets.to(socketId).emit("join_queue_res", queue)
    //   );
    //   // .filter((id) => socketId !== id)
    //   // .forEach(() => io.sockets.to(socketId).emit("join_queue_res", queue));
    // });
    console.log("student in hook", student);
    ws.current = socket;
    return () => {
      socket.close();
    };
  }, [session?.user, student, url]);

  // bind is needed to make sure `send` references correct `this`
  return { ws, state, student };
};
