import * as dynamoose from "dynamoose";
import { Document } from "dynamoose/dist/Document";
import settings from '@settings';

dynamoose.aws.sdk.config.update({
  "region": settings.AWS_REGION_NAME,
  "accessKeyId": settings.AWS_ACCESS_KEY_ID,
  "secretAccessKey": settings.AWS_SECRET_ACCESS_KEY,
});

if(!settings.PRODUCTION) {
  dynamoose.aws.ddb.local();
}

const sharedContentSchema = new dynamoose.Schema({
  id: String,
  name: String,
  filename: String,
}, { timestamps: true, });

class SharedContentType extends Document {
  id: string;
  name: string;
  filename: string;
}

const SharedContent = dynamoose.model<SharedContentType>('SharedContent', sharedContentSchema);

export default SharedContent;
