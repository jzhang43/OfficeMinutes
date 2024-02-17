"use client";

import { connect } from "socket.io-client";
import Image from "next/image";
import React from "react";
import { SignInButton } from "./components/SignInButton";

const socket = connect("http://localhost:8000");

// On mount, want to send a message to server indicating who u are
// On unmount, want to send a message to say remove from server

// { course: State }
// State = { queue: names[], listeners: string[], questions: Question[] }
// Question = {
//  id: string, question: string, tags: string[], people: names[], location: string
//}

export default function Home() {
  React.useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
      socket.emit("message", { message: "hello world", socketId: socket.id });

      socket.on("response", (message) => console.log(message));
    });
  }, []);

  return <SignInButton />;
}
