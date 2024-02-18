import { prisma } from "@/app/server/db";
import OfficeHour from "@/app/components/OfficeHour";
import TAOfficeHour from "@/app/components/TAOfficeHour";
import React from "react";
import { useWs } from "@/app/hooks";
import OfficeHourWrapper from "@/app/components/OfficeHourWrapper";
import WebsocketProvider from "@/context";

interface PageProps {
  params: {
    courseId: string;
  };
  searchParams?: { [key: string]: string };
}

const Page = async ({ params, searchParams }: PageProps) => {
  const course = await prisma.course.findFirstOrThrow({
    where: { code: params.courseId },
  });

  return (
    <WebsocketProvider
      course={course}
      searchParams={searchParams}
      backendUrl={process.env.BACKEND_URL ?? ""}
    >
      <OfficeHourWrapper />
    </WebsocketProvider>
  );
};

export default Page;
