'use strict';
const {testimonial,getTestimonialByQuery} = require('./testimonialModel'),
errorHandler 	  = 	require('./../../common/error-handler'),
//nodemailer 		= 	require('nodemailer'),
path				    =	  require('path'),
jwt 			 	    = 	require('jsonwebtoken');
const Helper = require("./../../common/Helper");
const review = async(body) => { 
  try{
    const response = await testimonial.create(body);
    return response;  
  }catch(e){
    let err = errorHandler.createError(e,500,true);
    throw err;
  }
};


module.exports = {
    review,
 
}
