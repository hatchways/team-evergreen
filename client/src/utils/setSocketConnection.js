import io from "socket.io-client";
let socket;

const setSocketConnection = token => {
    socket = io("ws://localhost:3001", {
        transports: ["websocket"],
        query: {
            token: token
        }
    });
};

export { setSocketConnection, socket };
