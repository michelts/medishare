import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { SignedPostDataFactory, SharedContentFactory } from '@factories';
import createSharedContent from '../createSharedContent';

jest.mock('axios');

jest.mock('uuid', () => ({
  __esModule: true,
  ...jest.requireActual('uuid'),
  v4: jest.fn(),
}));

describe('createSharedContent service call', () => {
  const file = 'blob://url-to-uploaded-file';

  it('should get a signed post url, upload file and create a shared content instance', async () => {
    const sharedContent = SharedContentFactory.build();
    uuidv4.mockReturnValue(sharedContent.id);
    const signedPostData = SignedPostDataFactory.build({ filename: sharedContent.filename });
    axios.post
      .mockResolvedValueOnce({ data: signedPostData }) // post to get url
      .mockResolvedValueOnce({}) // post to upload file: 200 ok
      .mockResolvedValue({ data: sharedContent }); // post to create db object

    const createdObj = await createSharedContent({ name: sharedContent.name, file });
    expect(createdObj).toEqual(sharedContent);
    assertSignedPostUrlWasRetrieved(sharedContent);
    assertFileWasPosted(signedPostData);
    assertSharedContentWasSaved(sharedContent);
  });

  function assertSignedPostUrlWasRetrieved({ id }) {
    expect(axios.post).toHaveBeenNthCalledWith(1, '/api/v1/upload-urls/', { id });
  }

  function assertFileWasPosted(data) {
    expect(axios.post).toHaveBeenNthCalledWith(2, data.url, expect.any(FormData));
    const formData = axios.post.mock.calls[1][1];
    expect(formData.get('file')).toEqual(file);
    Object.keys(data.fields).forEach(key => {
      expect(formData.get(key)).toEqual(data.fields[key]);
    });
  }

  function assertSharedContentWasSaved(sharedContent) {
    expect(axios.post).toHaveBeenNthCalledWith(3, '/api/v1/shared-contents/', sharedContent);
  }
});
