"use client";

import React from "react";
import { type OfficeHour, Status } from "@/types";
import Queue from "./Queue";
import { QuestionPost } from "./QuestionPost";

const STATE: OfficeHour = {
  questions: [
    {
      question: "Fibonacci Heaps",
      tags: ["HW Help", "Conceptual Help"],
      students: [
        {
          name: "Won Kim",
          socketId: "21312321",
        },
        {
          name: "Won Kim",
          socketId: "21312321",
        },
        {
          name: "Won Kim",
          socketId: "21312321",
        },
      ],
      private: false,
      status: Status.IN_PROGRESS,
      location: "here",
    },
    {
      question: "Kruskal's Runtime",
      tags: ["HW Help", "Conceptual Help"],
      students: [
        {
          name: "Johnny Tan",
          socketId: "21312321",
        },
      ],
      private: false,
      status: Status.WAITING,
      location: "here",
    },
    {
      question: "Recursion Tree",
      tags: ["HW Help", "Conceptual Help"],
      students: [
        {
          name: "Fa Taepaisitphongse",
          socketId: "21312321",
        },
        {
          name: "Won Kim",
          socketId: "23132121",
        },
      ],
      private: false,
      status: Status.WAITING,
      location: "here",
    },
  ],
  location: "JCC 3rd Floor",
  tas: [
    {
      name: "Nick Doan",
      socketId: "",
    },
    {
      name: "Jack Zhang",
      socketId: "",
    },
  ],
};

interface OfficeHourProps {
  backendUrl: string;
  course: { id: string; title: string; userIds: string[] };
}

const OfficeHour = (props: OfficeHourProps) => {
  const { backendUrl, course } = props;
  const [officeHourState, setOfficeHourState] = React.useState(STATE);

  return (
    <div className="h-full w-full">
      <div className="flex justify-between items-center py-4 px-12 bg-[#393939] text-white">
        <div className="text-4xl font-bold">{course.title} Office Hours</div>
        <div className="bg-[#2196F3] px-6 py-4 rounded uppercase text-sm shadow-sm cursor-pointer">
          Join Queue
        </div>
      </div>
      <div className="grid grid-cols-12 px-12 py-6">
        <div className="col-span-9 flex flex-col gap-y-4">
          <div className="grid grid-cols-12">
            <div className="lg:col-span-2 col-span-3 font-bold font-xl">
              TAs on Duty
            </div>
            <div className="flex gap-x-2.5 lg:col-span-10 col-span-9">
              {officeHourState.tas.map((ta, idx) => (
                <span key={idx}>{ta.name}</span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-12">
            <div className="lg:col-span-2 col-span-3 font-bold font-xl">
              Location(s)
            </div>
            <div className="flex gap-x-2.5 lg:col-span-10 col-span-9">
              {officeHourState.location}
            </div>
          </div>
          <div className="grid grid-cols-12">
            <div className="lg:col-span-2 col-span-3 font-bold font-xl">
              Hours
            </div>
            <div className="flex gap-x-2.5 lg:col-span-10 col-span-9">
              6PM - 9PM
            </div>
          </div>

          <div className="w-full h-0.5 bg-[#0000001F]" />

          <div className="flex justify-between">
            <div className="font-bold text-3xl text-[#393939]">
              Group Question Board
            </div>
            <div>HW Help Conceptual Help</div>
          </div>
          <div className="grid grid-cols-2 gap-1">
            {officeHourState.questions.map((question, idx) => (
              <div key={idx} className="col-span-1">
                <QuestionPost key={idx} question={question} />
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-3">
          <Queue state={STATE} />
        </div>
      </div>
    </div>
  );
};

export default OfficeHour;
