//upload.js

/*if (!process.env.ENV_LOADED) {require("dotenv").config()}*/
const express = require("express");
const router = express.Router();
const AWS = require("aws-sdk");
const uuidv4 = require("uuid/v4");
import { uploadFileToS3 } from "../utils/S3Upload";
const fileUpload = require("express-fileupload");
router.use(fileUpload());

router.post("/upload", function(req, res) {
    const files = req["files"];
    const file = files["file"];

    uploadFileToS3({ data: file.data, mimetype: file.mimetype }, res);
});

module.exports = router;
