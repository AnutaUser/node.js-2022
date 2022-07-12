const S3 = require('aws-sdk/clients/s3');
const uuid = require('uuid').v4;

const {configs} = require('../configs');
const path = require('path');

const BucketConfig = new S3({
    region: configs.AWS_S3_REGION,
    secretAccessKey: configs.AWS_S3_SECRET_ACCESS_KEY,
    accessKeyId: configs.AWS_S3_ACCESS_KEY
});

module.exports = {

    uploadFile: async (file, itemType, itemId) => {

        const Key = buildFilePath(file.name, itemType, itemId);

        return BucketConfig
            .upload({
                Bucket: configs.AWS_S3_BUCKET,
                Key,
                ContentType: file.mimetype,
                ACL: 'public-read',
                Body: file.data,
            })
            .promise();

    },

    updateFile: async (file, fileURL) => {

        const path = fileURL.split(configs.AWS_S3_BUCKET_URL).pop();

        return BucketConfig
            .upload({
                Bucket: configs.AWS_S3_BUCKET,
                Key: path,
                ContentType: file.mimetype,
                ACL: 'public-read',
                Body: file.data,
            })
            .promise();

    },

    deleteFile: async (fileURL) => {

        const path = fileURL.split(configs.AWS_S3_BUCKET_URL).pop();

        return BucketConfig
            .upload({
                Bucket: configs.AWS_S3_BUCKET,
                Key: path,
            })
            .promise();

    },

};

function buildFilePath(fileName, itemType, itemId) {
    const axt1 = fileName.split('.').pop();  // jpg
    const axt2 = path.extname(fileName); // .jpg

    // return `${itemType}/${itemId}/${uuid()}.${axt1}`
    return `${itemType}/${itemId}/${Date.now()}${axt2}`;
}
