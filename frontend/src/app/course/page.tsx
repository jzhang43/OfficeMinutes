import { Header } from "@/app/components/Header";
import { prisma } from "../server/db";
import Link from "next/link";
import { CourseSelection } from "@/app/components/Popup";

const Page = async () => {
  const courses = await prisma.course.findMany();

  return (
    <div className="h-full w-full">
      <Header />
      <div className="mt-8 px-12">
        <h1 className="text-2xl text-[#393939]">My Classes</h1>
        <div className="flex gap-6 mt-5 flex-wrap">
          {courses.map((course) => (
            <CourseSelection key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
