import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

export default { 
    SERVICE_ACCOUNT: process.env.FIREBASE_SERVICE_ACCOUNT ?? '',
    STORAGE_BUCKET : process.env.FIREBASE_STORAGE_BUCKET ?? '',
}