"use client";

import { useWs } from "@/app/hooks";
import { OfficeHour, Student } from "@/types";
import { Course } from "@prisma/client";
import React from "react";

interface WebsocketContext {
  course: Course;
  ws: any;
  state: OfficeHour;
  student: Student;
  role: "student" | "ta";
}

interface WebsocketProviderProps {
  children?: React.ReactNode;
  course: Course;
  searchParams?: { [key: string]: string };
  backendUrl: string;
}

const WebsocketContext = React.createContext({} as WebsocketContext);

const WebsocketProvider = (props: WebsocketProviderProps) => {
  const { children, searchParams, backendUrl, course } = props;

  const { ws, state, student } = useWs({ url: backendUrl });

  if (ws.current?.connected && student !== null) {
    return (
      <WebsocketContext.Provider
        value={{
          ws: ws,
          course: course,
          student: student,
          state: state,
          role: searchParams?.role === "ta" ? "ta" : "student",
        }}
      >
        {children}
      </WebsocketContext.Provider>
    );
  } else {
    return null;
  }
};

export default WebsocketProvider;
export { WebsocketContext };
