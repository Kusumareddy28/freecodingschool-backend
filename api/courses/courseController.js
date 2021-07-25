'use strict';
const {courses, getCoursesByQuery} = require('./courseModel'),
errorHandler 	  = 	require('./../../common/error-handler'),
//nodemailer 		= 	require('nodemailer'),
path				    =	  require('path'),
jwt 			 	    = 	require('jsonwebtoken');
const Helper = require("./../../common/Helper");
const helper = new Helper();

const course = async(body) => { 
  try{
    const {course_name, description,date,time} = body;
    const data = await getCoursesByQuery({course_name, description, date, time});
    if(!data){
     
      let err = errorHandler.createError("Valid data has not been entered");
      throw err;
    }
    const response = await courses.create(body);
    return response;  
  }catch(e){
    let err = errorHandler.createError(e,500,true);
    throw err;
  }
};

{/*
const createCourse = async(req, res, next) => {

  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return next(
      new HttpError("Invalid inputs passed, please check your data",422)
    );
  }
  const {course_name, description,date,time} = req.body;

  const createdCourse = new Course({
    course_name,
    description,
    date,
    time
  })
  try{
  await createdCourse.save();
  } catch(err){
    const error = new HttpError(
      'Creating course failed, please try again',
      500
    );
    return next(error);
  }
  res.status(201).json({course:createdCourse});
}
*/}

module.exports = {
  course
}