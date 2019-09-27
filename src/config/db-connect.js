//db-connect.js
/* Created by Fil on August 25, 2019 */

const config = require("./config");
const mongoose = require("mongoose");

let dbUrl = "";
if (process.env.NODE_ENV === "production") {
    const { type, host, name, userName, pwd, options } = config["db"];
    dbUrl = `${type}://${userName}:${pwd}${host}/${name}${options}`;
} else {
    const { type, host, port, name } = config["db"];
    dbUrl = `${type}://${host}:${port}/${name}`;
}

mongoose
    .connect(dbUrl, { useNewUrlParser: true, useCreateIndex: true })
    .then(() =>
        console.log(
            `Database environment loaded from ${process.env.NODE_ENV}\nConnected to ${dbUrl}`
        )
    )
    .catch(err => console.log(`Unable to connect. ${err}`));
