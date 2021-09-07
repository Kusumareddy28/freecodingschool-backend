const {getCoursesByQuery,deleteCourse, updateCourse} = require('./courseModel');
const utils = require("./../../common/utils");
const {course} =  require('./courseController');
const errorHandler = require('./../../common/error-handler');
const Helper = require("./../../common/Helper");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' }).single('avatar')
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
    body('start_time','Please enter the end time course').notEmpty();
    body('end_time','Please enter the end time course').notEmpty();
    body('days','Please enter start date of the course').notEmpty();    
    const errors = validationResult(req); 
    
	if (!errors.isEmpty()) {
		return res.status(400).send({
			error:true,
			message:errors
		});
	}else{
        upload(req, res, function (err) {
            
        })
        const data = req.body;               
        await course(data);
        res.json({success:true,data});
    }
});

exports.getCourse = utils.wrapAsync(async function(req,res){
    try{
        const course = await getCoursesByQuery({});
        res.json({success:true,data:course});
    }catch(e){
        let err = errorHandler.createError(e, 401, e);
        throw err;
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
exports.activateCourse = utils.wrapAsync(async function(req, res){
    const {authtoken} = req.headers;
    const {role} = await helper.validateToken(authtoken);
    if (role !== ADMIN) {
        let err = errorHandler.createError("Not Authorized", 401, true);
        throw err;
	}
    body('active','Please enter course active').notEmpty();   
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
		return res.status(400).send({
			error:true,
			message:errors
		});
	}else{
        const {id} = req.params;
        const {active} = req.body;
        try{
            const course = await updateCourse(id,active);
            res.json({success:true,data:course});
        }catch(error){         
            let err = errorHandler.createError(error?.message,500, error);
            throw err;
        }
    }
});
exports.deleteCourse = utils.wrapAsync(async function(req, res){
    const {authtoken} = req.headers;
    const {role} = await helper.validateToken(authtoken);
    if (role !== ADMIN) {
        let err = errorHandler.createError("Not Authorized", 401, true);
        throw err;
	}
    body('id','Please enter course id').notEmpty();   
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
		return res.status(400).send({
			error:true,
			message:errors
		});
	}else{
        try{
            const {id} = req.body;
            const course = await deleteCourse(id);
            res.json({success:true,data:course});
        }catch(error){         
            let err = errorHandler.createError(error?.message,500, error);
            throw err;
        }
    }
});