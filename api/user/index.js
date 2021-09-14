const userModel = require('./userModel');
const utils = require("./../../common/utils");
const {signup,signin} =  require('./userController');
const errorHandler = require('./../../common/error-handler');
const Helper = require("./../../common/Helper");
const helper = new Helper();
const { check, validationResult } = require('express-validator');
exports.signup =  utils.wrapAsync(async function(req,res){
    await check('first_name').notEmpty().withMessage({
        message: 'Please enter username'
    }).run(req);
    await check('email').isEmail().withMessage({
        message: 'Please enter valid email'
    }).run(req);
    await check('password').notEmpty().withMessage({
        message: 'Please enter password'
    }).run(req);
    await check('role').notEmpty().withMessage({
        message: 'Please select role'
    }).run(req);
    const errors = validationResult(req);
	if (!result.isEmpty()) {
		return res.status(400).send({
			error:true,
			message:result.errors
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
    await check('email').isEmail().withMessage({
        message: 'Please enter valid email'
    }).run(req);
    await check('password').notEmpty().withMessage({
        message: 'Please enter password'
    }).run(req);
    const result = validationResult(req);
	if (!result.isEmpty()) {
        let err = errorHandler.createError(result.errors, 400, true);
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