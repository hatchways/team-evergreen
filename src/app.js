// Load application environment configuration
require("dotenv").config();

// Load middleware used in managing and creating routes
import helmet from "helmet";
import createError from "http-errors";
import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import path from "path";
import { join } from "path";

// Establish database connection
import mongoose from "mongoose";
require("./config/db-connect");
mongoose.connection
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

// File management middleware
const bodyParser = require("body-parser");

// Load route files
const pingRouter = require("./routes/ping");
const users = require("./routes/api/users");
const upload = require("./routes/api/upload");
const vote = require("./routes/api/vote");
const results = require("./routes/api/results");
const requests = require("./routes/api/requests");
const friends = require("./routes/api/friends");

const app = express();

// Load header management middleware
app.use(helmet());

// Load file management middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Passport config
const passport = require("passport");

// Routes
app.use("/api/users", users);
app.use("/api/images", upload);
app.use("/api/poll", vote);
app.use("/api/poll", results);
app.use("/api/poll", requests);
app.use("/api/friends", friends);
//app.use("/", indexRouter);
app.use("/ping", pingRouter);

/*
 *  Any other route request will serve up react files
 *  This route must be declared after all other routes
 */
app.use(express.static(path.join(__dirname, "..", "client", "build")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

//Load passport middleware
app.use(passport.initialize());

//app.use(express.static(join(__dirname, "client", "build")));

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({ error: err });
});

module.exports = app;
