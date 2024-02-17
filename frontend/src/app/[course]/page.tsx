import { prisma } from "@/app/server/db";

const Page = async ({ params }: any) => {
  const course = await prisma.course.create({
    data: {
      title: "Algorithms",
      userIds: [],
    },
  });
  console.log(course);

  return <></>;
};

export default Page;
