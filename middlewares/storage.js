const path = require('path');
const { Storage } = require('@google-cloud/storage');
const multerGoogleStorage = require('multer-google-storage');
const multer = require('multer');
require('dotenv').config();

const storage = new Storage({
  keyFilename: path.join(__dirname, '../google-credentials.json'),
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
});

const bucketName = 'quco-inventory-management';
const bucket = storage.bucket(bucketName);

const multerStorage = multer.memoryStorage();

const upload = multer({ storage: multerStorage });

module.exports = {upload, storage, bucketName, bucket};