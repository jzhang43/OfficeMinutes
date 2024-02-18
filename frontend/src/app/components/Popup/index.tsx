"use client";

import { Course } from "@prisma/client";
import React from "react";
import Filler from "@/images/filler.jpeg";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CourseSelection {
  course: Course;
}

export const CourseSelection = ({ course }: CourseSelection) => {
  const router = useRouter();
  const [popup, setPopup] = React.useState(false);

  return (
    <>
      {popup && (
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
          onMouseLeave={() => setPopup(false)}
        >
          <div className="h-48 w-96 shadow-tile p-5 bg-white flex flex-col gap-y-4 items-center justify-center">
            <button
              className="py-4 w-full uppercase text-lg bg-[#1E88E5] text-white rounded"
              onClick={() => router.push(`/course/${course.code}`, quer)}
            >
              TA
            </button>
            <button className="py-4 w-full uppercase text-lg bg-[#1E88E5] text-white rounded">
              Student
            </button>
          </div>
        </div>
      )}
      <div
        className="h-32 w-96 shadow-tile rounded-lg p-5 flex gap-x-4 cursor-pointer"
        onClick={() => setPopup(true)}
      >
        <Image
          className="rounded-lg"
          width={80}
          height={80}
          alt="Filler Image"
          src={Filler.src}
        />
        <div className="flex flex-col gap-y-2.5">
          <h2 className="text-lg text-[#393939] uppercase">{course.code}</h2>
          <span className="text-[#393939]">{course.title}</span>
        </div>
      </div>
    </>
  );
};
