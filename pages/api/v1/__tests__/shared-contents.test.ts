import axios from 'axios';
import { SharedContentFactory } from '@factories';
import AWS from 'aws-sdk';

describe('shared-contents API endpoint', () => {
  beforeAll(() => {
    axios.defaults.adapter = require('axios/lib/adapters/http');
  });

  it('should save the shared content id, name and url to the database', async () => {
    const payload = SharedContentFactory.build();
    const { status, data } = await axios.post('http://localhost:3000/api/v1/shared-contents', payload);
    expect(status).toEqual(200);
    expect(data).toEqual(payload);
    expect(await getSavedData(payload)).toEqual({
      Item: {
        "Id": { S: payload.id },
        "Name": { S: payload.name },
        "Url": { S: payload.url }
      }
    });
  });

  function getSavedData({ id, name }) {
    const dynamodb = new AWS.DynamoDB({
      accessKeyId: 'fakeMyKeyId',
      secretAccessKey: 'fakeSecretAccessKey',
      region: 'us-east-1',
      endpoint: new AWS.Endpoint('http://localhost:8000')
    });
    const params = {
      Key: {
        "Id": { S: id },
        "Name": { S: name }
      },
      TableName: "SharedContent"
    };
    return new Promise((resolve, reject) => {
      dynamodb.getItem(params, (err, data) => {
        if(err) {
          reject(err);
          return;
        }
        resolve(data);
      });
    });
  }
});
