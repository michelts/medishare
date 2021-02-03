import { NowRequest, NowResponse } from '@vercel/node'
import SharedContent from '@models/shared-content';

export default async function (req: NowRequest, res: NowResponse): void {
  if(req.method === 'POST') {
    const { id, name, url } = req.body;
    res.status(201).json(await createObject({ id, name, url }));
  }
}

async function createObject({ id, name, url }) {
  const sharedContent = new SharedContent({ id, name, url });
  await sharedContent.save();
  return { id, name, url };
}
