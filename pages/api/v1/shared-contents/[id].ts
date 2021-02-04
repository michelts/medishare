import { NowRequest, NowResponse } from '@vercel/node';
import AWS from 'aws-sdk';
import SharedContent from '@models/shared-content';

type Query = {
  query: {
    id: string;
  }
};

export default async function (req: NowRequest & Query, res: NowResponse): Promise<void> {
  if(req.method === 'GET') {
    const { query } = req;
    console.log(query.id);
    const sharedContent = await SharedContent.get(query.id);
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
