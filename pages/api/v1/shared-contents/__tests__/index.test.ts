import axios from 'axios';
import { SharedContentFactory } from '@factories';
import SharedContent from '@models/shared-content';

describe('shared-contents list API endpoint', () => {
  beforeAll(() => {
    axios.defaults.adapter = require('axios/lib/adapters/http');
  });

  it('should save the shared content id, name and url to the database', async () => {
    const payload = SharedContentFactory.build();
    const { status, data } = await axios.post('http://localhost:3000/api/v1/shared-contents', payload);
    expect(status).toEqual(201);
    expect(data).toEqual(payload);

    const sharedContent = await SharedContent.get(payload.id);
    expect(sharedContent.name).toEqual(payload.name);
    expect(sharedContent.url).toEqual(payload.url);
  });
});
