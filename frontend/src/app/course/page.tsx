import { Header } from "@/app/components/Header";
import { prisma } from "../server/db";
import Filler from "@/images/filler.jpeg";
import Image from "next/image";
import Link from "next/link";

const Page = async () => {
  const courses = await prisma.course.findMany();

  return (
    <div className="h-full w-full">
      <Header />
      <div className="mt-8 px-12">
        <h1 className="text-2xl text-[#393939]">My Classes</h1>
        <div className="flex gap-6 mt-5">
          {courses.map((course) => (
            <Link key={course.id} href={`/course/${course.code}`}>
              <div className="h-32 w-96 shadow-tile rounded-lg p-5 flex gap-x-4">
                <Image
                  className="rounded-lg"
                  width={80}
                  height={80}
                  alt="Filler Image"
                  src={Filler.src}
                />
                <div className="flex flex-col gap-y-2.5">
                  <h2 className="text-lg text-[#393939] uppercase">
                    {course.code}
                  </h2>
                  <span className="text-[#393939]">{course.title}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
