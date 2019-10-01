//db-connect.js
/* Created by Fil on August 25, 2019 */

const config = require("./config");
const mongoose = require("mongoose");

let dbUrl = "";
let displayUrl = "No database url loaded.";
if (process.env.NODE_ENV === "production") {
    const { type, host, name, userName, pwd, options } = config["db"];
    dbUrl = `${type}://${userName}:${pwd}${host}/${name}${options}`;
    displayUrl = `\x1b[33m${type}://${userName}:<***************>${host}/${name}${options}\x1b[0m`;
} else {
    const { type, host, port, name } = config["db"];
    dbUrl = `\x1b[33m${type}://${host}:${port}/${name}\x1b[0m`;
    displayUrl = dbUrl;
}

mongoose
    .connect(dbUrl, { useNewUrlParser: true, useCreateIndex: true })
    .then(() =>
        console.log(
            `Database environment loaded from \x1b[32m${process.env.NODE_ENV.toUpperCase()}\nConnected to ${displayUrl}`
        )
    )
    .catch(err =>
        console.log(
            `\x1b[41mUnable to connect to ${displayUrl}.\n \x1b[0m${err}`
        )
    );
