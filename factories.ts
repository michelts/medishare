import { Factory } from 'rosie';
import { v1 as uuidv1 } from 'uuid';

export const SignedPostDataFactory = new Factory()
  .attr('url', 'http://url.to/signed-post-url')
  .attr('fields', { field1: 'value1', field2: 'value2' });

export const SharedContentFactory = new Factory()
  .attr('id', () => uuidv1())
  .attr('name', 'John Smith')
  .attr('url', ['id'], (id) => `http://url.to/${id}.webm`);
