const path = require('path');
const { Storage } = require('@google-cloud/storage');
const multerGoogleStorage = require('multer-google-storage');
const multer = require('multer');
require('dotenv').config();

const storage = new Storage({
  keyFilename: path.join(__dirname, '../google-credentials.json'),
  projectId: process.env.ProjectId,
});

const bucketName = 'quco-inventory-management';

const multerStorage = multerGoogleStorage.storageEngine({
  autoRetry: true,
  bucket: 'quco-inventory-management',
  projectId: 'Quco',
  keyFilename: path.join(__dirname, '../google-credentials.json'),
  filename: (req, file, cb) => {
    cb(null, file.originalname);    
    // cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: multerStorage });

module.exports = {upload, storage, bucketName};