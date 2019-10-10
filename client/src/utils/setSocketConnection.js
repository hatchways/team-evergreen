import io from "socket.io-client";
let socket;

const setSocketConnection = userId => {
    if (userId) {
        socket = io("ws://localhost:3001", {
            transports: ["websocket"],
            query: {
                userId: userId
            }
        });
    }
};

export { setSocketConnection, socket };
