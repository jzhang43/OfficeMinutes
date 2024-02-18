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

    socket.on("update", (state) => {
      console.log("State update", state);
      setState(state);
    });

    ws.current = socket;

    return () => {
      socket.close();
    };
  }, [session?.user, student, url]);

  // bind is needed to make sure `send` references correct `this`
  return { ws, state, student };
};
