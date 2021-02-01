import axios from 'axios';
import { v1 as uuidv1 } from 'uuid';
import { SharedContentFactory } from '@factories';
import retrieveSharedContent from '../retrieveSharedContent';

jest.mock('axios');

describe('retrieveSharedContent service call', () => {
  it('should return the content extracted from the API endpoint', async () => {
    const id = uuidv1()
    const sharedContent = SharedContentFactory.build();
    axios.get.mockResolvedValue({ data: sharedContent });

    const retrievedObj = await retrieveSharedContent({ id });
    expect(retrievedObj).toEqual(sharedContent);
    expect(axios.get).toHaveBeenCalledWith(`/api/v1/shared-contents/${id}`);
  });
});
