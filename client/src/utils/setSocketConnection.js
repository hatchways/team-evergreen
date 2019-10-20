import io from "socket.io-client";
import { DEVELOPMENT_SERVER_PORT } from "../constants";
let socket;

// set websocket server port to appropriate value depending on environment
let port, protocol;
if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
    port = process.env.PORT || DEVELOPMENT_SERVER_PORT;
    protocol = "ws";
} else {
    port = window.location.port;
    protocol = "wss";
}

const setSocketConnection = token => {
    socket = io(`${protocol}://localhost:${port}`, {
        transports: ["websocket"],
        query: {
            token: token
        }
    });
};

export { setSocketConnection, socket };
