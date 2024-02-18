"use client";

import { connect } from "socket.io-client";
import React from "react";
import { SignInButton } from "./components/SignInButton";
import { Header } from "./components/Header";
import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <div className="h-full w-full overflow-hidden">
      <Header />
      <div className="h-full w-full flex flex-col items-center justify-center">
        <div className="flex flex-col gap-y-2 mb-16 items-center">
          <div className="flex gap-x-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
            >
              <path
                d="M18 36C15.51 36 13.17 35.5275 10.98 34.5825C8.79 33.6375 6.885 32.355 5.265 30.735C3.645 29.115 2.3625 27.21 1.4175 25.02C0.4725 22.83 0 20.49 0 18C0 15.51 0.4725 13.17 1.4175 10.98C2.3625 8.79 3.645 6.885 5.265 5.265C6.885 3.645 8.79 2.3625 10.98 1.4175C13.17 0.4725 15.51 0 18 0C20.49 0 22.83 0.4725 25.02 1.4175C27.21 2.3625 29.115 3.645 30.735 5.265C32.355 6.885 33.6375 8.79 34.5825 10.98C35.5275 13.17 36 15.51 36 18C36 20.49 35.5275 22.83 34.5825 25.02C33.6375 27.21 32.355 29.115 30.735 30.735C29.115 32.355 27.21 33.6375 25.02 34.5825C22.83 35.5275 20.49 36 18 36ZM18 32.4C22.02 32.4 25.425 31.005 28.215 28.215C31.005 25.425 32.4 22.02 32.4 18C32.4 16.08 32.04 14.235 31.32 12.465C30.6 10.695 29.565 9.135 28.215 7.785L18 18V3.6C13.98 3.6 10.575 4.995 7.785 7.785C4.995 10.575 3.6 13.98 3.6 18C3.6 22.02 4.995 25.425 7.785 28.215C10.575 31.005 13.98 32.4 18 32.4Z"
                fill="#393939"
              />
            </svg>
            <h1 className="text-4xl text-[#393939]">Office Minutes</h1>
          </div>
          <span className="text-xl">
            A better CS Office Hours for Tufts University
          </span>
        </div>
        <button
          className="bg-[#2196F3] uppercase px-64 py-2 text-white rounded shadow-login"
          onClick={() => signIn("google", { callbackUrl: "/course" })}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
