'use strict';
const {testimonial,getTestimonialByQuery} = require('./testimonialModel'),
errorHandler 	  = 	require('./../../common/error-handler'),
//nodemailer 		= 	require('nodemailer'),
path				    =	  require('path'),
jwt 			 	    = 	require('jsonwebtoken');
const Helper = require("./../../common/Helper");
const helper = new Helper();
const review = async(body) => { 
  try{
    const {name, designation, org_or_school, review} = body;
    const data = await getTestimonialByQuery({name, designation, org_or_school, review});
    if(data){
        let err = errorHandler.createError("Review already given",400,true);
        throw err;
    } 
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