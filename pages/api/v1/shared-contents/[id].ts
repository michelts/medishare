import { NowRequest, NowResponse } from '@vercel/node';
import AWS from 'aws-sdk';
import SharedContent from '@models/shared-content';

export default async function (req: NowRequest, res: NowResponse): void {
  if(req.method === 'GET') {
    const { query: { id } } = req;
    const sharedContent = await SharedContent.get(id);
    const endpoint = 'http://localhost:8001';
    const bucket = 'videos';
    const s3 = new AWS.S3({
      s3ForcePathStyle: true,
      accessKeyId: 'S3RVER',
      secretAccessKey: 'S3RVER',
      endpoint: new AWS.Endpoint(endpoint),
    });
    const url = s3.getSignedUrl('getObject', {
      Bucket: bucket,
      Key: sharedContent.filename,
      Expires: 60
    });
    console.log('The URL is', url);
    res.status(200).json({
      id: sharedContent.id,
      name: sharedContent.name,
      url,
    });
  }
}
