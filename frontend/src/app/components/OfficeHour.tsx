"use client";

import React from "react";

interface OfficeHourProps {
  backendUrl: string;
  course: { id: string; title: string; userIds: string[] };
}

const OfficeHour = (props: OfficeHourProps) => {
  const { backendUrl, course } = props;

  React.useEffect(() => {}, []);

  return (
    <div className="h-full w-full">
      <div className="flex justify-between items-center py-4 px-12 bg-[#393939] text-white">
        <div className="text-4xl font-bold">{course.title} Office Hours</div>
        <div className="bg-[#2196F3] px-6 py-4 rounded uppercase text-sm shadow-sm cursor-pointer">
          Join Queue
        </div>
      </div>
    </div>
  );
};

export default OfficeHour;
