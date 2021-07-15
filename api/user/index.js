const userModel = require('./userModel');
const {signup,signin} =  require('./userController');
const Helper = require("./../../lib/Helper");
const helper = new Helper();
const { body, validationResult } = require('express-validator');
exports.signup = async function(req,res){
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
        const user = await userModel.getUserByQuery({email:data.email});
        if(user){
            return res.status(400).json({ error:true,message:"User is already registered"})
        }        
        data.last_name = data.last_name || "";
        const response = await signup(data);
        const token = helper.generateJWT(response);
        res.setHeader("AuthToken",token);
        res.status(201);
    }
}
exports.signin = async function(req,res){
    body('email','Please enter email').notEmpty();
    body('email','Please enter valid email').isEmail();
    body('password','Please enter password').notEmpty();
    const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).send({
			error:true,
			message:errors
		});
	}else{
        const data = req.body;
        const user = await userModel.getUserByQuery({email:data.email});
        if(!user){
            return res.status(400).json({ error:true,message:"User is not registered"})
        }else{
            try{
                const response = await signin(user,data);
                const token = helper.generateJWT(response);
                res.setHeader("AuthToken",token);
                res.status(201);
            }catch(e){
                return res.status(401).send({
                    error:true,
                    message:e
                }); 
            }

        }     
    }
}