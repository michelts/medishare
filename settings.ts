const DEVELOPMENT = process.env.VERCEL_ENV !== 'production' && process.env.VERCEL_URL !== 'preview';

const settings = {
  DEVELOPMENT,
  AWS_ACCESS_KEY_ID: process.env.MEDISHARE_AWS_ACCESS_KEY_ID || 'S3RVER',
  AWS_SECRET_ACCESS_KEY: process.env.MEDISHARE_AWS_SECRET_ACCESS_KEY || 'S3RVER',
  AWS_REGION_NAME: process.env.MEDISHARE_AWS_REGION_NAME || 'us-east-1',
  BUCKET_NAME: process.env.BUCKET_NAME || 'videos',
  S3_ENDPOINT: DEVELOPMENT ? 'http://localhost:8001' : '',
  PROJECT_URL: `${DEVELOPMENT ? 'http' : 'https'}://${process.env.VERCEL_URL}`,
}

export default settings;
