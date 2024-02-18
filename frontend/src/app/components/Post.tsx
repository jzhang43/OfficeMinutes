import React from "react";
import { type OfficeHour, Status } from "@/types";

interface QuestionPostProps {
  question: OfficeHour["questions"][number];
}

export const QuestionPost = (props: QuestionPostProps) => {
  return;
  <div className="flex shadow-sm">
    <div className="font-bold font-xl">props.question</div>;
    <div className="bg-[#0288D1] rounded-full px-3 py-4 items-center">
      HW Help
    </div>
  </div>;
};
