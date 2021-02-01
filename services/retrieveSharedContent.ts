import axios from 'axios';

export default async function retrieveSharedContent({ id }: { id: string }): SharedContent {
  const { data } = await axios.get(`/api/v1/shared-contents/${id}`)
  return data;
}
