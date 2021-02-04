import { NowRequest, NowResponse } from '@vercel/node';
import settings from '@settings';
import SharedContent from '@models/shared-content';
import getS3Obj from '@services/getS3Obj';

type Query = {
  query: {
    id: string;
  }
};

export default async function (req: NowRequest & Query, res: NowResponse): Promise<void> {
  if(req.method === 'GET') {
    const { query } = req;
    const sharedContent = await SharedContent.get(query.id);
    const url = getS3Obj().getSignedUrl('getObject', {
      Bucket: settings.BUCKET_NAME,
      Key: sharedContent.filename,
      Expires: 60
    });
    res.status(200).json({
      id: sharedContent.id,
      name: sharedContent.name,
      url,
    });
  }
}
