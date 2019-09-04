//db-connect.js
/* Created by Fil on August 25, 2019 */

const config = require("./config.js");
const mongoose = require("mongoose");

const dbUrl = `${config.db.dbType}://${config.db.host}:${config.db.port}/${config.db.name}`;

mongoose
    .connect(dbUrl, { useNewUrlParser: true, useCreateIndex: true })
    .then(() => console.log(`Connected to ${dbUrl}`))
    .catch(err => console.log(`Unable to connect. ${err}`));
