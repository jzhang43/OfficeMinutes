import React from "react";
import { type OfficeHour, Status } from "@/types";

interface QuestionPostProps {
  question: OfficeHour["questions"][number];
}

export const QuestionPost = (props: QuestionPostProps) => {
  return (
    <div className="shadow-md rounded-xl">
      <div className="justify-between py-4 px-4 flex">
        <div className="font-bold font-xl">{props.question.question}</div>
        <div>{props.question.students[0].name}</div>
      </div>

      <div className="flex gap-2 px-3">
        <div className="bg-[#0288D1] text-white text-sm px-2 py-1 rounded-3xl items-center">
          HW Help
        </div>
        <div className="bg-[#0288D1] text-white text-sm px-2 py-1 rounded-3xl items-center">
          Conceptual Help
        </div>
      </div>

      <div className="py-3 px-3">{props.question.description}</div>
      <div className="items-center flex px-12 py-3">
        <button className="bg-[#0288D1] text-white text-sm px-40 py-4 rounded items-center">
          JOIN GROUP
        </button>
      </div>
    </div>
  );
};
