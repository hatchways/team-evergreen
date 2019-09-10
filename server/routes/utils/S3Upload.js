/**s3Upload
 *@date September 8, 2019
 *@author Fil
 */

// Load environment variables if unit testing
if (!process.env.ENV_LOADED) {
    require("dotenv").config();
}

// Packages used for uploading to S3
const AWS = require("aws-sdk");

// Miscellaneous Packages
const uuidv4 = require("uuid/v4");

/**
 *
 * @param req - [files] to upload in an array
 * @param res - callback - on success: {status: 200,  url: returns file location }
 *                         on error: { status: 500,  message: error }
 */
export function filesToUpload(req, res) {
    const files = Object.keys(req);

    const uploadsPromised = [];
    files.forEach(fileName => {
        try {
            uploadsPromised.push(promiseToUploadFileToS3(req[fileName]));
        } catch {
            console.log(error);
        }
    });

    // execute all the promises - returns error if any fail
    const results = Promise.all(uploadsPromised)
        .then(result => {
            res({ status: 200, result });
        })
        .catch(error => {
            console.log("Error uploading to S3", error);
            res({ status: 500, message: error.error.message });
        });
}

// PRIVATE FUNCTIONS

/**
 * @desc Creates a connection to S3 storage and uploads file
 * @param file -  {data: - file buffer, mimetype: - type of file being sent}
 * @returns promise
 * @access private
 */
async function promiseToUploadFileToS3(file) {
    //
    const S3 = new AWS.S3({
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

    //Executes the upload - returns resolve or reject depending on what happened
    return await new Promise((resolve, reject) => {
        S3.upload(params, function(err, data) {
            if (err) {
                reject({ error: err });
            } else {
                resolve(data.Location);
            }
        });
    });
}
