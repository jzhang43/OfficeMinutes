"use client";

import React, { useState } from "react";
import { type OfficeHour, Status, Question } from "@/types";
import { useSession } from "next-auth/react";

interface Props {
  state: OfficeHour;
}

export default function CurrentGroup({ state }: Props) {
  const { data: session } = useSession();
  const [currQuestion, setCurrQuestion] = useState<Question | null>(null);
  const [currIndex, setCurrIndex] = useState<number | null>(null);

  React.useEffect(() => {
    state.questions.forEach((q, index) => {
      q.students.forEach((element) => {
        console.log(element.name);
        if (session !== null && element.id === session.user.id) {
          console.log("found");
          setCurrQuestion(q);
          console.log(q);
          setCurrIndex(index);
        }
      });
    });
  }, [session, state]);

  return (
    <div className="flex flex-col gap-3">
      {currQuestion && (
        <div className="flex gap-x-2 w-full bg-[#EDF7ED] py-3 px-2.5 justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
          >
            <path
              d="M15.2075 6.94825L9.16665 12.9891L5.87581 9.70742L4.58331 10.9999L9.16665 15.5833L16.5 8.24992L15.2075 6.94825ZM11 1.83325C5.93998 1.83325 1.83331 5.93992 1.83331 10.9999C1.83331 16.0599 5.93998 20.1666 11 20.1666C16.06 20.1666 20.1666 16.0599 20.1666 10.9999C20.1666 5.93992 16.06 1.83325 11 1.83325ZM11 18.3333C6.94831 18.3333 3.66665 15.0516 3.66665 10.9999C3.66665 6.94825 6.94831 3.66659 11 3.66659C15.0516 3.66659 18.3333 6.94825 18.3333 10.9999C18.3333 15.0516 15.0516 18.3333 11 18.3333Z"
              fill="#2E7D32"
            />
          </svg>
          You&apos;re in the Queue!
        </div>
      )}
      <div className="grid grid-cols-8">
        <div className="col-span-2">
          <div className="font-bold text-4xl">{currIndex}</div>
          <div className="py-3 text-xs">On Queue</div>
        </div>

        <div className="col-span-6">
          <div className="border-[#2196F3] border-2 text-[#2196F3] text-sm px-2 py-2 rounded shadow-md">
            EDIT SUBMISSION
          </div>
          <div className="pt-2">
            <div className="border-[#2196F3] border-2 text-[#2196F3] text-sm px-2 py-2 rounded shadow-md">
              LEAVE QUEUE
            </div>
          </div>
        </div>
      </div>

      {currQuestion && (
        <>
          <div className="w-full h-0.5 bg-[#0000001F]" />
          <div className="font-bold text-lg">{currQuestion?.question}:</div>
        </>
      )}
      {currQuestion?.students.map((Student, index) => (
        <span className="font-normal text-base" key={index}>
          {index + 1}. {Student.name}
        </span>
      ))}
      <div className="w-full h-0.5 bg-[#0000001F]" />
    </div>
  );
}
