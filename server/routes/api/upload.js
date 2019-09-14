//upload.js

const express = require("express");
const router = express.Router();

// File upload packages
import { filesToUpload } from "../utils/S3Upload";
const fileUpload = require("express-fileupload");
router.use(fileUpload());

// External Modules
import { createNewPoll } from "../utils/pollModelUpdates";
import { updateUserAvatar } from "../utils/userModelUpdates";

// Constants Used in This Module

const TARGET_POLLS = "poll_images";
const TARGET_AVATAR = "avatar_image";

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
        filesToUpload(req["files"], response => {
            if (response.status !== 200) {
                res.send(response.result);
            } // There was an error
            // save the path to the image
            if (req.body.target === TARGET_POLLS) {
                const params = {
                    userId: req.body.userId,
                    title: req.body.title,
                    sendToList: req.body.sendToList,
                    // expiresOn: req.body.expiresOn,
                    options: response.result
                };
                createNewPoll(params)
                    .then(response => res.send(response))
                    .catch(response => res.send(response));
            } else if (req.body.target === TARGET_AVATAR) {
                const params = {
                    userId: req.body.userId,
                    options: response.result
                };
                updateUserAvatar(params)
                    .then(response => res.send(response))
                    .catch(response => res.send(response));
            } else {
                console.log("No target");
                res.send({
                    status: 500,
                    errors: `No target specified. Given ${req.body.target}`
                });
            }
        });
    }
});

//PRIVATE FUNCTIONS

module.exports = router;
