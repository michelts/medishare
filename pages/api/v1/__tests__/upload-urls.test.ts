import axios from 'axios';
import { v1 as uuidv1 } from 'uuid';

describe('upload-urls API endpoint', () => {
  beforeAll(() => {
    axios.defaults.adapter = require('axios/lib/adapters/http');
  });

  it('should return a signed post url to upload the file *{id}.webm*', async () => {
    const endpoint = 'http://localhost:8001'; // compatible with s3-local
    const bucketName = 'videos';
    const id = uuidv1();

    const { status, data } = await axios.post('http://localhost:3000/api/v1/upload-urls', { id });
    expect(status).toEqual(200);
    expect(data.url).toEqual(`${endpoint}/${bucketName}`);
    expect(data.fields['Content-Type']).toEqual('video/webm');
    expect(data.fields['bucket']).toEqual(bucketName);
    expect(data.fields['key']).toEqual(`${id}.webm`);
  });
});
