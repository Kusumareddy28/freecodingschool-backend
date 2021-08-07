const Courses = require('./courseModel');
const utils = require("./../../common/utils");
const {course} =  require('./courseController');
const errorHandler = require('./../../common/error-handler');
const Helper = require("./../../common/Helper");
const helper = new Helper();
const { body, validationResult } = require('express-validator');
const ADMIN = "ADMIN";
exports.course =  utils.wrapAsync(async function(req,res){
    const {authtoken} = req.headers;
    const {role} = await helper.validateToken(authtoken);
    if (role !== ADMIN) {
        let err = errorHandler.createError("Not Authorized", 401, true);
        throw err;
	}
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
        await course(data);
        res.json({success:true,data});
    }
});

exports.getCourse = utils.wrapAsync(async function(req,res){
    const course = await Courses.find({},{});
    delete course.__v;
	if (!course) {
        let err = errorHandler.createError("Course does not exist", 401, true);
        throw err;
	}else{   
        res.json({success:true,data:course});
    }
});
exports.getTestimonial = utils.wrapAsync(async function(req,res){
    try{
        const testimonials = await Testimonial.find({},{});
        res.json({success:true,data:testimonials});
    }catch(error){
        let err = errorHandler.createError(error?.message,500, error);
        throw err;
    }
});

exports.getCourseById = utils.wrapAsync(async function(req, res){
    const {id} = req.params;
    try{
        const testimonial = await Testimonial.findById(id);
        res.json({success:true,data:testimonial});
    }catch(error){         
        let err = errorHandler.createError(error?.message,500, error);
        throw err;
    }
});
