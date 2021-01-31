import { NowRequest, NowResponse } from '@vercel/node'
import AWS from 'aws-sdk';

export default async function (req: NowRequest, res: NowResponse): void {
  if(req.method === 'POST') {
    const { id, name, url } = req.body;
    res.status(200).json(await createObject({ id, name, url }));
  }
}

function createObject({ id, name, url }) {
  const dynamodb = new AWS.DynamoDB({
    accessKeyId: 'fakeMyKeyId',
    secretAccessKey: 'fakeSecretAccessKey',
    region: 'us-east-1',
    endpoint: new AWS.Endpoint('http://localhost:8000')
  });
  const params = {
    Item: {
      "Id": { S: id },
      "Name": { S: name },
      "Url": { S: url }
    },
    ReturnConsumedCapacity: "TOTAL",
    TableName: "SharedContent"
  };
  dynamodb.putItem(params, (err, data) => {
    if(err) {
      console.log(err, err.stack);
    } else {
      console.log(data);
    }
  });
  return { id, name, url };
}
