'use strict';
const {user,getUserByQuery} = require('./userModel'),
errorHandler 	  = 	require('./../../common/error-handler'),
//nodemailer 		= 	require('nodemailer'),
path				    =	  require('path'),
jwt 			 	    = 	require('jsonwebtoken');
const Helper = require("./../../common/Helper");
const helper = new Helper();
const signup = async(body) => { 
  try{
    const {email} = body;
    const data = await getUserByQuery({email});
    if(data){
        let err = errorHandler.createError("User is already registered",400,true);
        throw err;
    }  
    body.is_verified = true;
    body.password = helper.encryptPassword(body.password);
    const response = await user.create(body);
    return response;  
  }catch(e){
    let err = errorHandler.createError(e,500,true);
    throw err;
  }
};

const signin = async(body) =>{
  try{
    const {email,password} = body;
    const user = await getUserByQuery({email});
    if(!user){
        let err = errorHandler.createError("User is not registered", 400, true);
        throw err;
    }
    const decrypted = await helper.decryptPassword(user.password);
    if(password !== decrypted){
      let err = errorHandler.createError("Password is incorrect", 400, true);
      throw err;
    }
    delete user.password;
    return user;
  }catch(e){
    throw (e);
  }
}

module.exports = {
  signin,
  signup
}