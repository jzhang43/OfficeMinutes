import { prisma } from "@/app/server/db";
import OfficeHour from "@/app/components/OfficeHour";
import TAOfficeHour from "@/app/components/TAOfficeHour";

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

  if (searchParams && searchParams.role === "ta") {
    return (
      <TAOfficeHour
        backendUrl={process.env.BACKEND_URL ?? ""}
        course={course}
      />
    );
  } else {
    return (
      <OfficeHour backendUrl={process.env.BACKEND_URL ?? ""} course={course} />
    );
  }
};

export default Page;
