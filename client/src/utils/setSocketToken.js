import io from "socket.io-client";
let socket;

const setSocketToken = token => {
    if (token) {
        console.log("Setting socket token...", token);
        // TODO: send token to back end to verify connection
    }
};

socket = io("ws://localhost:3001", {
    transports: ["websocket"]
});

export { setSocketToken, socket };
