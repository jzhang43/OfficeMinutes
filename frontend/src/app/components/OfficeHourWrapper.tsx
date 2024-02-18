"use client";

import { useWs } from "../hooks";
import OfficeHour from "./OfficeHour";
import TAOfficeHour from "./TAOfficeHour";

interface OfficeHourWrapperProps {
  course: {
    id: string;
    title: string;
    code: string;
    userIds: string[];
  };
  searchParams?: { [key: string]: string };
  backendUrl: string;
}

const OfficeHourWrapper = (props: OfficeHourWrapperProps) => {
  const { course, searchParams, backendUrl } = props;

  const { ws, state, student } = useWs({ url: backendUrl });

  if (ws.current?.connected) {
    if (searchParams && searchParams.role === "ta") {
      return (
        <TAOfficeHour course={course} ws={ws} state={state} student={student} />
      );
    } else {
      return <OfficeHour course={course} ws={ws} state={state} />;
    }
  } else {
    return null;
  }
};

export default OfficeHourWrapper;
