"use client";

import React, { useState } from "react";
import { type OfficeHour, Status } from "@/types";

interface QuestionPostProps {
  question: OfficeHour["questions"][number];
}

export const QuestionPost = (props: QuestionPostProps) => {
  const [joined, setOnJoined] = React.useState(false);

  const onClick = () => {
    setOnJoined(!joined);
  };

  return (
    <div className="flex flex-col justify-between shadow-question rounded-xl h-96 p-5">
      <div className="flex flex-col gap-y-3">
        <div className="flex justify-between">
          <div className="font-bold text-2xl text-[#393939]">
            {props.question.question}
          </div>
          <div className="text-[#393939]">
            {props.question.students[0].name}
          </div>
        </div>

        <div className="flex gap-2">
          {props.question.tags.map((tag, idx) => (
            <div
              key={idx}
              className="bg-[#0288D1] text-white text-sm px-2 py-1 rounded-3xl items-center"
            >
              <span key={idx}> {tag} </span>
            </div>
          ))}
        </div>
        <p className="max-h-32 overflow-scroll">{props.question.description}</p>
        <div className="flex justify-end">
          <div className="text-[#393939] text-xs">
            Asked at {props.question.time}
          </div>
        </div>
      </div>
      <div className="justify-center flex px-20">
        <button
          className={`w-full uppercase py-4 text-sm rounded shadow-md ${
            joined
              ? "border-[#0288D1] border-2 text-[#0288D1]"
              : "bg-[#1E88E5] text-white"
          }`}
          onClick={onClick}
        >
          {joined ? "Joined" : "Join group"}
        </button>
      </div>
    </div>
  );
};
