import * as dynamoose from "dynamoose";
import { Document } from "dynamoose/dist/Document";

dynamoose.aws.sdk.config.update({
  region: 'us-east-1',
});
dynamoose.aws.ddb.local();

const sharedContentSchema = new dynamoose.Schema({
  id: String,
  name: String,
  url: String,
}, { timestamps: true, });

class SharedContentType extends Document {
  id: string;
  name: string;
  url: string;
}

const SharedContent = dynamoose.model<SharedContentType>('SharedContent', sharedContentSchema);

export default SharedContent;
