import axios from 'axios';
import SharedContent from '@models/shared-content';
import { SharedContentFactory } from '@factories';

describe('shared-contents detail API endpoint', () => {
  beforeAll(() => {
    axios.defaults.adapter = require('axios/lib/adapters/http');
  });

  it('should retrieve the shared content by the id', async () => {
    const sharedContentData = SharedContentFactory.build();
    const sharedContent = new SharedContent({ ...sharedContentData });
    await sharedContent.save();

    const url = `http://localhost:3000/api/v1/shared-contents/${sharedContentData.id}`
    const { status, data } = await axios.get(url);
    expect(status).toEqual(200);
    expect(data).toEqual({
      id: sharedContentData.id,
      name: sharedContentData.name,
      url: `http://localhost:8000/videos/${sharedContent.filename}`,
    });
  });
});
