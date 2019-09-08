//upload.js

const express = require("express");
const router = express.Router();

import { filesToUpload } from "../utils/S3Upload";
const fileUpload = require("express-fileupload");
router.use(fileUpload());

/**
 * @desc Passes the file data to file upload function
 */
router.post("/upload", function(req, res) {
    // no files uploaded
    if (Object.keys(req.files).length === 0) {
        res.status(400).toJSON({ message: "No files to upload." });
    } else {
        filesToUpload(req["files"], res);
    }
});

module.exports = router;
