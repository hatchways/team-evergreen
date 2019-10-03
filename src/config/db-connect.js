//db-connect.js
/* Created by Fil on August 25, 2019 */

const config = require("./config");
const mongoose = require("mongoose");

let dbUrl = "";
let displayUrl = "No database url loaded.";
if (process.env.NODE_ENV === "production") {
    const { type, host, name, userName, pwd, options } = config["db"];
    dbUrl = `${type}://${userName}:${pwd}${host}/${name}${options}`;
    displayUrl = `${type}://${userName}:<***************>${host}/${name}${options}`;
} else {
    const { type, host, port, name } = config["db"];
    dbUrl = `${type}://${host}:${port}/${name}`;
    displayUrl = dbUrl;
}

mongoose
    .connect(dbUrl, { useNewUrlParser: true, useCreateIndex: true })
    .then(() =>
        console.log(
            `Database environment loaded from \x1b[32m${process.env.NODE_ENV.toUpperCase()}\n\x1b[0mConnected to \x1b[33m${displayUrl}\x1b\[0m`
        )
    )
    .catch(err =>
        console.log(
            `Unable to connect to \x1b[41m${displayUrl}.\n \x1b[0m${err}`
        )
    );
