//upload.js

const express = require("express");
const router = express.Router();

import { filesToUpload } from "../utils/S3Upload";
const fileUpload = require("express-fileupload");
router.use(fileUpload());

/**
 * @desc Passes the file data to file upload function if there is a file in req
 * @desc This function will always execute if there is at least one file to upload
 * @desc Does not check to make sure that you have 2 images if that's what you
 * @desc meant to do.  Send all files required.
 */
router.post("/upload", function(req, res) {
    // no files uploaded
    if (req.files === null) {
        res.send({ status: 400, message: "No files to upload." });
    } else {
        filesToUpload(req["files"], res);
    }
});

module.exports = router;
