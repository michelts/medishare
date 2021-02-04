import axios from 'axios';

type SharedContentType = {
  id: string,
  name: string,
  url: string
}

export default async function retrieveSharedContent({ id }: { id: string }): Promise<SharedContentType> {
  const { data } = await axios.get(`/api/v1/shared-contents/${id}`)
  return data;
}
