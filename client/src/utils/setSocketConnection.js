import io from "socket.io-client";
import { DEFAULT_SERVER_PORT } from "../constants";
let socket;

// load port from environment, otherwise default to 3001
let port = process.env.PORT || DEFAULT_SERVER_PORT;
console.log(`Port set to ${port}, process.env.PORT is ${process.env.port}`);
const setSocketConnection = token => {
    socket = io(`ws://localhost`, {
        transports: ["websocket"],
        query: {
            token: token
        }
    });
};

export { setSocketConnection, socket };
