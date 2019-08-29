import createError from "http-errors";
import express, { json, urlencoded } from "express";
import { join } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import indexRouter from "./routes/index";
import pingRouter from "./routes/ping";

var app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
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

//Inserting new code to support back-end api.
//Leaving the boiler plate code alone for now - may need to refactor
//Author - Fil - 8/28/2019
//Inspiration - https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669

const bodyParser = require("body-parser");

// Bodyparser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Connect to database
import _ from "./config/db-connect";
import mongoose from "mongoose";
const db = mongoose.connection
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

module.exports = app;
