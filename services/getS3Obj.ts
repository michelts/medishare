import AWS from 'aws-sdk';
import settings from '@settings';

export default function getS3Bucket(): any {
  let endpoint = undefined;
  if(settings.S3_ENDPOINT) {
    endpoint = new AWS.Endpoint(settings.S3_ENDPOINT);
  }
  return new AWS.S3({
    s3ForcePathStyle: true,
    accessKeyId: settings.AWS_ACCESS_KEY_ID,
    secretAccessKey: settings.AWS_SECRET_ACCESS_KEY,
    endpoint
  })
}
