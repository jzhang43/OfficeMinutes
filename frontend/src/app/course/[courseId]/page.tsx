import { prisma } from "@/app/server/db";
import OfficeHour from "@/app/components/OfficeHour";
import TAOfficeHour from "@/app/components/OfficeHour";
import OfficeHourTA from "@/app/components/TAOfficeHour";

interface PageProps {
  params: {
    courseId: string;
  };
}

// 65d1286b1c14d455b986bdcb
const Page = async ({ params }: PageProps) => {
  const course = await prisma.course.findFirstOrThrow({
    where: { code: params.courseId },
  });

  return (
    <>
      <OfficeHourTA
        backendUrl={process.env.BACKEND_URL ?? ""}
        course={course}
      />
    </>
  );
};

export default Page;
