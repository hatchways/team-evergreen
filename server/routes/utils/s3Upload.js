//s3Upload
//September 5, 2019
//Extracting out S3 upload function

const AWS = require("aws-sdk");
const BUCKET_NAME = process.env.bucket;
const IAM_USER_KEY = process.env.AWSAccessKeyId;
const IAM_USER_SECRET = process.env.AWSSecretKey;

export default function uploadToS3(file, documentToUpdate, pathField, res) {
    //file = file object
    //modelObject = an object of the data model type that will hold path to file
    let s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
        Bucket: BUCKET_NAME
    });

    let params = {
        Bucket: BUCKET_NAME,
        Key: file.name,
        Body: file.data
    };

    s3bucket.upload(params, (err, data) => {
        if (err) {
            console.log("upload failed");
        }
        documentToUpdate[pathField] = data.Location;
        documentToUpdate.save((err, modelObj) => {
            if (err) {
                console.log(`failed to save ${documentToUpdate.schema}`);
                res.writeHead(400);
                res.end();
            }
            res.json({ name: user.name, avatar: user.avatar });
        });
    });
}
