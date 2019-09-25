//db-connect.js
/* Created by Fil on August 25, 2019 */

const config = require("./config");
const mongoose = require("mongoose");

const db = config["db"];
const dbUrl = `${db.dbType}://${db.host}:${db.port}/${db.name}`;

mongoose
    .connect(dbUrl, { useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log(`Connected to ${dbUrl}`))
    .catch(err => console.log(`Unable to connect. ${err}`));
