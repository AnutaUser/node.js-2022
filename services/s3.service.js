const S3 = require('aws-sdk/clients/s3');
const uuid = require('uuid').v4;

const {constants} = require('../configs');
const path = require('path');

const BucketConfig = new S3({
    region: constants.AWS_S3_REGION,
    secretAccessKey: constants.AWS_S3_SECRET_ACCESS_KEY,
    accessKeyId: constants.AWS_S3_ACCESS_KEY
});

const uploadFile = async (file, itemType, itemId) => {

    const Key = buildFilePath(file.name, itemType, itemId)

    return BucketConfig
        .upload({
            Bucket: constants.AWS_S3_BUCKET,
            Key,
            ACL: 'public-read',
            Body: file.data
        })
        .promise();

};

module.exports = {
    uploadFile
};

function buildFilePath(fileName, itemType, itemId) {
    const axt1 = fileName.split('.').pop();  // jpg
    const axt2 = path.extname(fileName); // .jpg

    // return `${itemType}/${itemId}/${uuid()}.${axt1}`
    return `${itemType}/${itemId}/${Date.now()}${axt2}`
}
