import { NowRequest, NowResponse } from '@vercel/node'
import SharedContent from '@models/shared-content';

export default async function (req: NowRequest, res: NowResponse): void {
  if(req.method === 'POST') {
    const { id, name, filename } = req.body;
    res.status(201).json(await createObject({ id, name, filename }));
  }
}

async function createObject({ id, name, filename }) {
  const sharedContent = new SharedContent({ id, name, filename });
  await sharedContent.save();
  return { id, name, filename };
}
