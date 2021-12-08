const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');

aws.config.update({
  secretAccessKey:process.env.AWS_ACCESS_SECRET,
  accessKeyId:process.env.AWS_ACCESS_ID,
  region:process.env.AWS_S3_REGION
})

const s3folder = process.env.AWS_S3_PATH
const s3 = new aws.S3();
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET,
    // metadata: function (req, file, cb) {
    // // cb(null, {fieldName: 'courses'});
    // cb(null, {fieldName: file.fieldname});
      
    // },
    key: function (req, file, cb) {
      const ext =  path.extname(file.originalname)
      cb(null,`${s3folder}/${Date.now().toString()}${ext}`)
    }
  })
});
module.exports = upload;
