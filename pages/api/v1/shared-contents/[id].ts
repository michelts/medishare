import { NowRequest, NowResponse } from '@vercel/node'

export default async function (req: NowRequest, res: NowResponse): void {
  if(req.method === 'GET') {
    res.status(201).json({'detail': 'ok'});
  }
}
