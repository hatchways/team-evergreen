"use strict";

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _express = _interopRequireWildcard(require("express"));

var _path = require("path");

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _index = _interopRequireDefault(require("./routes/index"));

var _ping = _interopRequireDefault(require("./routes/ping"));

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};
        if (obj != null) {
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    var desc =
                        Object.defineProperty && Object.getOwnPropertyDescriptor
                            ? Object.getOwnPropertyDescriptor(obj, key)
                            : {};
                    if (desc.get || desc.set) {
                        Object.defineProperty(newObj, key, desc);
                    } else {
                        newObj[key] = obj[key];
                    }
                }
            }
        }
        newObj.default = obj;
        return newObj;
    }
}

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

require("dotenv").config();

require("./config/db-connect");

const bodyParser = require("body-parser"); // Load route files

const users = require("./routes/api/users");

const upload = require("./routes/api/upload");

const vote = require("./routes/api/vote");

const results = require("./routes/api/results");

const requests = require("./routes/api/requests");

const friends = require("./routes/api/friends");

const app = (0, _express.default)(); // Bodyparser middleware

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json()); // Connect to database

const db = _mongoose.default.connection
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err)); //Passport config

const passport = require("passport");

require("./config/passport")(passport); // Routes

app.use("/api/users", users);
app.use("/api/images", upload);
app.use("/api/poll", vote);
app.use("/api/poll", results);
app.use("/api/poll", requests);
app.use("/api/friends", friends);
app.use((0, _morgan.default)("dev"));
app.use((0, _express.json)());
app.use(
    (0, _express.urlencoded)({
        extended: false
    })
);
app.use((0, _cookieParser.default)()); //Passport middleware

app.use(passport.initialize());
app.use(_express.default.static((0, _path.join)(__dirname, "public")));
app.use("/", _index.default);
app.use("/ping", _ping.default); // catch 404 and forward to error handler

app.use(function(req, res, next) {
    next((0, _httpErrors.default)(404));
}); // error handler

app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {}; // render the error page

    res.status(err.status || 500);
    res.json({
        error: err
    });
});
module.exports = app;
