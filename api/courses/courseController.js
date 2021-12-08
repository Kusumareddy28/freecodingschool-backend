'use strict';
const {courseModel, getCoursesByQuery} = require('./courseModel'),
errorHandler 	  = 	require('./../../common/error-handler'),
path				    =	  require('path'),
jwt 			 	    = 	require('jsonwebtoken');
// const Helper = require("./../../common/Helper");
const upload = require('./../../common/fileupload')
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/courses/")
//   },
//   filename: (req, file, cb) => {
//     const ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
//     cb(null, Date.now() + ext)
//   },
// })
const addCourse = async(body) => { 
  const {course_name} = body;
  const data = await getCoursesByQuery({course_name});  
  if(data?.length > 0)
    throw('Course name is already found')
  body.days = body.days.split(",")
  const response = await courseModel.create(body);
  return response;  
};

// const uploadImage = (req,res) => {
//   const upload = multer({storage }).single('file');
//   return new Promise((resolve,reject) => {
//     upload(req,res,(err) => {
//       if(err)
//           reject(err);      
//       resolve(req?.file?.filename)
//     });
//   });
// }

const uploadImage = (req,res) => {
  const uploadImg = upload.single('file')
  return new Promise((resolve,reject) => {
    uploadImg(req,res,async(err) => {
      if(err)
        reject(err);      
      resolve(req?.file?.filename)
      console.log(res.file)
     // const  response = await courseModel.create({photoUrl : req.file.location});
     // return response;
    });
  });
}


module.exports = {
  addCourse,
  uploadImage
}