const userModel = require('./userModel');
const utils = require("./../../common/utils");
const {signup,signin} =  require('./userController');
const errorHandler = require('./../../common/error-handler');
const Helper = require("./../../common/Helper");
const helper = new Helper();
const { body, validationResult } = require('express-validator');
exports.signup =  utils.wrapAsync(async function(req,res){
    body('first_name','Please enter username').notEmpty();
    body('email','Please enter email').notEmpty();
    body('email','Please enter valid email').isEmail();
    body('password','Please enter password').notEmpty();
    body('role','Please select role').notEmpty();
    const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).send({
			error:true,
			message:errors
		});
	}else{
        const data = req.body;               
        data.last_name = data.last_name || "";
        const response = await signup(data);
        const token = helper.generateJWT(response);
        res.json({token,role:response.role});
    }
});
exports.signin = utils.wrapAsync(async function(req,res){
    body('email','Please enter email').notEmpty();
    body('email','Please enter valid email').isEmail();
    body('password','Please enter password').notEmpty();
    const errors = validationResult(req);
	if (!errors.isEmpty()) {
        let err = errorHandler.createError(errors, 400, true);
        throw err;
	}else{    
        const data = req.body;    
        const response = await signin(data);
        const token = helper.generateJWT(response); 
        res.json({token,role:response.role});
    }
});
exports.getUser = utils.wrapAsync(async function(req,res){
    const {authtoken} = req.headers;
    const user = await helper.validateToken(authtoken);
	if (!user) {
        let err = errorHandler.createError("Not Authenticated", 401, true);
        throw err;
	}else{    
        const {first_name,phone,last_name,email} = user
        res.json({
            success:true,
            data:{
                first_name,
                phone,
                last_name,
                email
            }
        });
    }
});