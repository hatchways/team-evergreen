/**s3Upload
 *@date September 8, 2019
 *@author Fil
 */

// Load environment variables if unit testing
if (!process.env.ENV_LOADED) {
    require("dotenv").config();
}

const AWS = require("aws-sdk");
const uuidv4 = require("uuid/v4");

/**
 * @desc Creates a connection to S3 storage and uploads file
 * @param req - {data: - file buffer, mimetype: - type of file being sent}
 * @param res - callback - on success: { url: returns file location }
 *                         on error: { returns error: true, message: error }
 */
export function uploadFileToS3(req, res) {
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
        Body: req.data,
        ContentType: req.mimetype,
        ACL: "public-read"
    };
    S3.upload(params, function(err, data) {
        if (err) {
            res.status(500).json({ error: true, Message: err });
        } else {
            res.status(200).json({ url: data.Location });
        }
    });
}
