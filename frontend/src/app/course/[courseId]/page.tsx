import { prisma } from "@/app/server/db";
import OfficeHour from "@/app/components/OfficeHour";
import TAOfficeHour from "@/app/components/TAOfficeHour";
import React from "react";
import { useWs } from "@/app/hooks";
import OfficeHourWrapper from "@/app/components/OfficeHourWrapper";

interface PageProps {
  params: {
    courseId: string;
  };
  searchParams?: { [key: string]: string };
}

// 65d1286b1c14d455b986bdcb
const Page = async ({ params, searchParams }: PageProps) => {
  const course = await prisma.course.findFirstOrThrow({
    where: { code: params.courseId },
  });

  return (
    <OfficeHourWrapper
      course={course}
      searchParams={searchParams}
      backendUrl={process.env.BACKEND_URL ?? ""}
    />
  );
};

export default Page;
