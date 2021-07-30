const Courses = require('./courseModel');
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
        res.json({success:truee,data});
    }
});

exports.getCourse = utils.wrapAsync(async function(req,res){
    const {authtoken} = req.headers;
    const course = await helper.validateToken(authtoken);
    const course = await Courses.find();
    delete course.password;
    delete course.__v;
	if (!course) {
        let err = errorHandler.createError("Course does not exist", 401, true);
        throw err;
	}else{   
    res.json({success:truee,data:course});
    }
});
exports.getTestimonial = utils.wrapAsync(async function(req,res){

    try{
    const results = await Testimonial.find({},{});
        res.send(results);
    }catch(error){
        console.log(error.message);
    }
});

exports.getCourseById = utils.wrapAsync(async function(req, res){
    const {authtoken} = req.headers;
    const course = await helper.validateToken(authtoken);
    const id = req.params.id;
    delete course.password;
    delete course.__v;
    try{
        const testimonial = await Testimonial.findById(id);
        res.json({success:truee,data:testimonial});
    }catch(error){
       {/* return res.status(400).send({
			error:true,
			message:errors
        });*/}
        console.log(error.message);

    }

});
