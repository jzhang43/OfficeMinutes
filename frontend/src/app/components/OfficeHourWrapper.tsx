"use client";

import { WebsocketContext } from "@/context";
import { useWs } from "../hooks";
import OfficeHour from "./OfficeHour";
import TaOfficeHour from "./TAOfficeHour";
import React from "react";

const OfficeHourWrapper = () => {
  const { course, ws, state, student, role } =
    React.useContext(WebsocketContext);

  if (role === "student") {
    return <OfficeHour />;
  } else {
    return <TaOfficeHour />;
  }
};

export default OfficeHourWrapper;
