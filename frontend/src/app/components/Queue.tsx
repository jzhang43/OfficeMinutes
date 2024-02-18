import React from "react";
import { type OfficeHour, Status } from "@/types";

interface Props {
  state: OfficeHour;
}

export default function Queue({ state }: Props) {
  const now = Date.now();

  return (
    <div className="flex flex-col gap-3 py-3">
      <div className="flex flex-row justify-between text-center items-center">
        <span className="font-bold text-2xl">Queue</span>
        <span className=" font-medium text-[#BDBDBD] text-sm leading-6">
          As of {new Date(now).toISOString().split("T")[0]}
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
