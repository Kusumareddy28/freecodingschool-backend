'use strict';
const user 			= 	require('./userModel'),
// errorHandler 	  = 	require('./error.controller'),
//nodemailer 		= 	require('nodemailer'),
path				    =	  require('path'),
jwt 			 	    = 	require('jsonwebtoken');
// db              =   require('lib//config/database');
const Helper = require("./../../lib/Helper");
const helper = new Helper();
const signup = async(body) => {     
  body.is_verified = true;
  body.password = helper.encryptPassword(body.password);
  const newUser = new user(body);
  const data = await newUser.save();
  return data;  
};

const signin = async(user,body) =>{
  const password = helper.decryptPassword(user.password);
  const isValid = await userModel.comparePassword(user.password,body.password);
  if(!isValid)
      return res.status(400).send({err:true,errText:'Password is incorrect'});
};

module.exports = {
  signin,
  signup
}