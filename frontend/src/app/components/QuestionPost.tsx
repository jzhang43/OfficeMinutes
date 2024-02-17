import React from "react";
import { type OfficeHour, Status } from "@/types";

interface QuestionPostProps {
  question: OfficeHour["questions"][number];
}

export const QuestionPost = (props: QuestionPostProps) => {
  return (
    <div className="">
      <div className="bg-[#FFFFFF]">{props.question.question}</div>
    </div>
  );
};
