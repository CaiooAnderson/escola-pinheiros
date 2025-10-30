import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  endpoint: `https://${process.env.B2_ENDPOINT}`,
  region: process.env.B2_REGION || "us-west-000",
  credentials: {
    accessKeyId: process.env.B2_KEY_ID!,
    secretAccessKey: process.env.B2_APP_KEY!,
  },
});

const BUCKET_NAME = process.env.B2_BUCKET_NAME || "";

export const s3Service = {
  async uploadFile(file: Express.Multer.File, folder?: string, key?: string) {
    const fileName =
      key || `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`;
    const fileKey = folder ? `${folder}/${fileName}` : fileName;

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await s3.send(command);

    return fileKey;
  },

  async getSignedUrl(key: string, expiresIn = 60 * 60) {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    });

    const url = await getSignedUrl(s3, command, { expiresIn });
    return url;
  },
};
