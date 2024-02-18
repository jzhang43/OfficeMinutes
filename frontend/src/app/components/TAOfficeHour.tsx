"use client";

import React from "react";
import { type OfficeHour, Status } from "@/types";
import Queue from "./Queue";
import { TAQuestionPost } from "./TAQuestionPost";
import { Header } from "./Header";
import JoinModal from "./JoinModal";
import CurrentGroup from "./CurrentGroup";

const STATE: OfficeHour = {
  questions: [
    {
      question: "Fibonacci Heaps",
      tags: ["HW Help", "Bro Help"],
      students: [
        {
          name: "Won Kim",
          socket: "21312321",
          id: "",
        },

        {
          name: "Won Kim",
          socket: "21312321",
          id: "",
        },
      ],
      description:
        "Could someone explain why node 17 becomes the child of 15? I understand that we cannot have 2 trees with degree 2, but I was inclined to make 20 the child of 15.",
      private: false,
      status: Status.IN_PROGRESS,
      time: "4:44pm",
    },
    {
      question: "Kruskal's Runtime",
      tags: ["HW Help", "Conceptual Help"],
      students: [
        {
          name: "Johnny Tan",
          id: "",
          socket: "21312321",
        },
      ],
      description: "I love math",
      private: true,
      status: Status.WAITING,
      time: "3:33pm",
    },
    {
      question: "Recursion Tree",
      tags: ["HW Help", "Conceptual Help"],
      students: [
        {
          name: "Fa Taepaisitphongse",
          id: "",
          socket: "21312321",
        },
        {
          name: "Won Kim",
          id: "",
          socket: "23132121",
        },
        {
          name: "Jack Zhang",
          id: "65d178ab07173f4ac5868a46",
          socket: "",
        },
      ],
      description: "I love alcohol",
      private: false,
      status: Status.WAITING,
      time: "2:22pm",
    },
  ],
  location: "JCC 3rd Floor",
  tas: [
    {
      name: "Nick Doan",
      id: "",
      socket: "",
    },
    {
      name: "Jack Zhang",
      id: "",
      socket: "",
    },
  ],
};

interface OfficeHourProps {
  backendUrl: string;
  course: { id: string; title: string; userIds: string[] };
}

const OfficeHourTA = (props: OfficeHourProps) => {
  const { backendUrl, course } = props;
  const [officeHourState, setOfficeHourState] = React.useState(STATE);
  const [showModal, setShowModal] = React.useState<boolean>(false);

  return (
    <div className="h-full w-full relative">
      <Header
        headerLeft={
          <div className="text-4xl font-bold">{course.title} Office Hours</div>
        }
      />
      <div className="h-full w-full grid grid-cols-12 pl-12 pr-4">
        <div className="col-span-9 flex flex-col gap-y-4 py-6 pr-3">
          <div className="w-full border border-[#0288D1] rounded py-1 px-2 flex gap-x-3">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
              >
                <path
                  d="M10.0833 6.41671H11.9167V8.25004H10.0833V6.41671ZM10.0833 10.0834H11.9167V15.5834H10.0833V10.0834ZM11 1.83337C5.94 1.83337 1.83334 5.94004 1.83334 11C1.83334 16.06 5.94 20.1667 11 20.1667C16.06 20.1667 20.1667 16.06 20.1667 11C20.1667 5.94004 16.06 1.83337 11 1.83337ZM11 18.3334C6.9575 18.3334 3.66667 15.0425 3.66667 11C3.66667 6.95754 6.9575 3.66671 11 3.66671C15.0425 3.66671 18.3333 6.95754 18.3333 11C18.3333 15.0425 15.0425 18.3334 11 18.3334Z"
                  fill="#0288D1"
                />
              </svg>
            </div>
            <div className="flex flex-col gap-y-2 text-[#014361]">
              <h2 className="font-bold">Announcement</h2>
              <p>
                Write a good description and not &quot;can you solve this for
                me&quot; - it helps you more than it help us!
              </p>
            </div>
          </div>
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
              Queue ({officeHourState.questions.length} People)
            </div>
          </div>
          <div className="h-full grid grid-cols-1 gap-8">
            {officeHourState.questions.map((question, idx) => (
              <div key={idx} className="lg:col-span-1 col-span-1">
                <TAQuestionPost key={idx} question={question} />
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-3 h-full w-full border-l-2 sticky overflow-x-hidden overflow-y-scroll px-6 py-8">
          <Queue state={STATE} />
        </div>
      </div>
    </div>
  );
};

export default OfficeHourTA;
