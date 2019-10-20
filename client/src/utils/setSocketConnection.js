import io from "socket.io-client";
import { DEVELOPMENT_SERVER_PORT } from "../constants";
let socket;

// set websocket server port to appropriate value depending on environment
let port;
if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
    port = process.env.PORT || DEVELOPMENT_SERVER_PORT;
} else {
    port = window.location.port;
}

const setSocketConnection = token => {
    socket = io(`ws://localhost:${port}`, {
        transports: ["websocket"],
        query: {
            token: token
        }
    });
};

export { setSocketConnection, socket };
