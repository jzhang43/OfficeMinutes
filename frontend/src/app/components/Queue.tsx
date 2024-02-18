"use client";

import React from "react";
import { type OfficeHour, Status } from "@/types";

interface Props {
  state: OfficeHour;
}

export default function Queue({ state }: Props) {
  const now = Date.now();
  const options = { timeZone: "America/New_York" };

  return (
    <div className="flex flex-col px-6 h-[677px] w-full gap-3 border-l-2">
      <div className="flex flex-row justify-between text-center">
        <span className="font-bold text-xl">Queue</span>
        <span className=" font-medium text-[#BDBDBD] text-sm leading-6">
          As of {new Date(now).toLocaleTimeString("en-US", options)}
        </span>
      </div>
      {state.questions.map((question, index) => (
        <span className="font-normal text-base" key={index}>
          {index + 1}. {question.students[0].name}
        </span>
      ))}
    </div>
  );
}
