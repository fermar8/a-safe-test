"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadUserImage = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const user_1 = require("./user");
async function uploadUserImage(id, image) {
    try {
        const user = await (0, user_1.getUserById)(id);
        const s3 = new client_s3_1.S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_KEY,
            },
        });
        const putObjectCommand = new client_s3_1.PutObjectCommand({
            Bucket: process.env.AWS_BUCKET,
            Key: image === null || image === void 0 ? void 0 : image.filename,
            Body: await (image === null || image === void 0 ? void 0 : image.toBuffer()),
            ContentType: image === null || image === void 0 ? void 0 : image.mimetype,
        });
        await s3.send(putObjectCommand);
        user.image = `https://${process.env.AWS_BUCKET}.s3.eu-west-3.amazonaws.com/${image === null || image === void 0 ? void 0 : image.filename}`;
        const updatedUser = await (0, user_1.updateUser)(id, user);
        return updatedUser;
    }
    catch (error) {
        throw error;
    }
}
exports.uploadUserImage = uploadUserImage;
