#!/usr/bin/env node

/* Sets up the environment variables from your .env file*/
require("dotenv").config();

import { registerVote } from "../routes/utils/voteModelUpdates";
import { getVotes } from "../routes/utils/getVotes";

/**
 * Module dependencies.
 */

let app = require("../app");
let http = require("http");

/**
 * Get port from environment and store in Express.
 */

let port = normalizePort(process.env.PORT || "3001");
app.set("port", port);

/**
 * Create HTTP server.
 */

let server = http.createServer(app);

// Attach socket.io to a server:
const io = require("socket.io")(server);


/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    let port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }

    let bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    let addr = server.address();
    let bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;

    console.log("Listening on " + bind);
}


io.on("connection", socket => {
    console.log("Connection is established!");

    // When  socket gets established, listen for any “event” message.
    // Get initial voting results for specific poll:
    socket.on("initial_results", pollId => {
        getVotes(pollId).then(result => {
            io.sockets.emit("update_results", result);
        });
    });


    socket.on("register_vote", data => {
        registerVote(data.pollId, data.userId, data.option).then(result => {
            // Let front-end know that results were changed:
            io.sockets.emit("results_changed");
        });
    });

    socket.on("disconnect", function () {
        console.log("User disconnected");
    });
});