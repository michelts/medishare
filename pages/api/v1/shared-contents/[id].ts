import { NowRequest, NowResponse } from '@vercel/node';
import SharedContent from '@models/shared-content';

export default async function (req: NowRequest, res: NowResponse): void {
  if(req.method === 'GET') {
    const { query: { id } } = req;
    const sharedContent = await SharedContent.get(id);
    res.status(200).json({
      id: sharedContent.id,
      name: sharedContent.name,
      url: sharedContent.url,
    });
  }
}
