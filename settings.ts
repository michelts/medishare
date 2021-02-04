const settings = {
  PRODUCTION: process.env.NODE_ENV === 'production',
  AWS_ACCESS_KEY_ID: process.env.MEDISHARE_AWS_ACCESS_KEY_ID || 'S3RVER',
  AWS_SECRET_ACCESS_KEY: process.env.MEDISHARE_AWS_SECRET_ACCESS_KEY || 'S3RVER',
  AWS_REGION_NAME: process.env.MEDISHARE_AWS_REGION_NAME || 'us-east-1',
  BUCKET_NAME: process.env.BUCKET_NAME || 'videos',
  S3_ENDPOINT: '',
  PROJECT_URL: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000',
}

if(!settings.PRODUCTION) {
  settings.S3_ENDPOINT = 'http://localhost:8001';
}

export default settings;
