const coursesModel = require('./courseModel');
const utils = require("./../../common/utils");
const {course} =  require('./courseController');
const errorHandler = require('./../../common/error-handler');
const Helper = require("./../../common/Helper");
const helper = new Helper();
const { body, validationResult } = require('express-validator');
exports.course =  utils.wrapAsync(async function(req,res){
    body('course_name','Please enter coursename').notEmpty();
    body('description','Please enter course description').notEmpty();
    body('time','Please enter the duration of the course').notEmpty();
    body('date','Please enter start date of the course').notEmpty();
    
    const errors = validationResult(req); 
	if (!errors.isEmpty()) {
		return res.status(400).send({
			error:true,
			message:errors
		});
	}else{
        const data = req.body;               
        const response = await course(data);
        res.json(response);
    }
});

