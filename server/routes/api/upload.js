//upload.js

require("dotenv").config();
const express = require("express");
const router = express.Router();
const AWS = require("aws-sdk");
const uuidv4 = require("uuid/v4");

const Busboy = require("busboy");
const fileUpload = require("express-fileupload");
router.use(fileUpload());

// route to upload a pdf document file
// In upload.single("file") - the name inside the single-quote is the name of the field that is going to be uploaded.
router.post("/upload", function(req, res) {
    const files = req["files"];
    const file = files["file"];
    //const fn = file["filename"];

     //do something with the response
        let s3bucket = new AWS.S3({
                                      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                                      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                                      region: process.env.AWS_REGION
                                  });

        //Where you want to store your file
        const params = {
            Bucket: process.env.AWS_IMAGES_BUCKET,
            Key: uuidv4(),
            Body: file.data,
            ContentType: file.mimetype,
            ACL: "public-read"
        };
        s3bucket.upload(params, function(err, data) {
            if (err) {
                res.status(500).json({ error: true, Message: err });
            } else {
                res.json({ status: 200, data });
                // Save to Mongo
                /* var document = new DOCUMENT(newFileUploaded);
                document.save(function(error, newFile) {
                    if (error) {
                        throw error;
                    }
                });
                */
            }
        });
});


module.exports = router;
