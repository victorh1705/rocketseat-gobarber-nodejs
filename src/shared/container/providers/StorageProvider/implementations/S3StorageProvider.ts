import * as fs from 'fs';
import path from 'path';
import aws from 'aws-sdk';
import S3 from 'aws-sdk/clients/s3';
import mime from 'mime';

import upload from '@config/upload';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'sa-east-1',
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(upload.tmpFolder, file);

    const ContentType = mime.getType(originalPath);

    if (!ContentType) {
      throw new Error('File not found!');
    }

    const fileContent = await fs.promises.readFile(originalPath);

    await this.client
      .putObject({
        Bucket: 'app-go-2',
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
        ContentDisposition: `inline; filename=${file}`,
      })
      .promise();

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: 'app-go-2',
        Key: file,
      })
      .promise();
  }
}

export default S3StorageProvider;
