import { NowRequest, NowResponse } from '@vercel/node';
import settings from '@settings';
import getS3Obj from '@services/getS3Obj';

export default async function (req: NowRequest, res: NowResponse): Promise<void> {
  if(req.method === 'POST') {
    const { id } = req.body;
    res.status(200).json(await getPresignedPostData({ id }));
  }
}

async function getPresignedPostData({ id }) {
  const filename = `${id}.webm`;
  const data = await getS3Obj().createPresignedPost({
    Expires: 60,
    Bucket: settings.BUCKET_NAME,
    Conditions: [['content-length-range', 100, 25 * (1024 ** 2)]], // 100Byte up to 25MB
    Fields: { 'Content-Type': 'video/webm', key: filename }
  });
  return { ...data, filename };
}
