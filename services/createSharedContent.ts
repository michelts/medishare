import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

type SharedContent = {
  id: string,
  name: string,
  filename: string
};

export default async function createSharedContent({ name, file }: { name: string, file: string }): SharedContent {
  const id = uuidv4()
  const { url, fields, filename } = await getSignedPostUrl({ id });
  await postFile({ url, fields, file });
  return await saveSharedContent({ id, name, filename });
}

async function getSignedPostUrl({ id }) {
  const { data: { url, fields, filename } } = await axios.post('/api/v1/upload-urls/', { id });
  return { url, fields, filename };
}

async function postFile({ url, fields, file }) {
  const payload = new FormData()
  Object.keys(fields).forEach(key => payload.append(key, fields[key]))
  payload.append('file', file)
  await axios.post(url, payload);
}

async function saveSharedContent({ id, name, filename }) {
  const { data } = await axios.post('/api/v1/shared-contents/', { id, name, filename })
  return data;
}
