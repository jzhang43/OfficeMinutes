import { connect } from "socket.io-client";

export const socket = connect(process.env.BACKEND_URL ?? "");
