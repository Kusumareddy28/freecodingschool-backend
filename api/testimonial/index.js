const testimonialModel = require('./testimonialModel');
const utils = require("./../../common/utils");
const {review} =  require('./testimonialController');
const errorHandler = require('./../../common/error-handler');
const Helper = require("./../../common/Helper");
const helper = new Helper();
const { body, validationResult } = require('express-validator');
exports.review =  utils.wrapAsync(async function(req,res){
    body('name','Please enter your name').notEmpty();
    body('designation','Please enter your designation').notEmpty();
    body('org_or_school','Please enter your organization name').notEmpty();
    body('review','Please give your review').notEmpty();
    const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).send({
			error:true,
			message:errors
		});
	}else{
        const data = req.body;               
        const response = await review(data);
        res.json(response);
    }
});
