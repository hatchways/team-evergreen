require("dotenv").config();
import helmet from "helmet";
import createError from "http-errors";
import express, { json, urlencoded } from "express";
import { join } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import indexRouter from "./routes";
import pingRouter from "./routes/ping";

// End point api imports
import mongoose from "mongoose";
require("./config/db-connect");
const bodyParser = require("body-parser");

// Load route files
const users = require("./routes/api/users");
const upload = require("./routes/api/upload");
const vote = require("./routes/api/vote");
const results = require("./routes/api/results");
const requests = require("./routes/api/requests");
const friends = require("./routes/api/friends");

const app = express();

// Helmet header management middleware
app.use(helmet());

// Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to database
const db = mongoose.connection
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

//Passport config
const passport = require("passport");
//require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/images", upload);
app.use("/api/poll", vote);
app.use("/api/poll", results);
app.use("/api/poll", requests);
app.use("/api/friends", friends);

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

//Passport middleware
app.use(passport.initialize());

app.use(express.static(join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/ping", pingRouter);

// catch 404 and forward to error handler
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
