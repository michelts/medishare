import { NowRequest, NowResponse } from '@vercel/node'
import AWS from 'aws-sdk';

export default async function (req: NowRequest, res: NowResponse): void {
  if(req.method === 'POST') {
    const { id } = req.body;
    res.status(200).json(await getPresignedPostData({ id }));
  }
}

function getPresignedPostData({ id }) {
  const s3 = new AWS.S3({
    s3ForcePathStyle: true,
    accessKeyId: 'S3RVER',
    secretAccessKey: 'S3RVER',
    endpoint: new AWS.Endpoint('http://localhost:8001'),
  });
  const params = {
    Expires: 60,
    Bucket: 'videos',
    Conditions: [['content-length-range', 100, 25 * (1024 ** 2)]], // 100Byte up to 25MB
    Fields: {
      'Content-Type': 'video/webm',
      key: `${id}.webm`
    }
  };
  return new Promise((resolve, reject) => {
    s3.createPresignedPost(params, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
}
