const {getCoursesByQuery,getCoursesById,deleteCourse, updateCourse} = require('./courseModel');
const utils = require("./../../common/utils");
const {course} =  require('./courseController');
const errorHandler = require('./../../common/error-handler');
const multer = require('multer');
// const upload = require("./../../common/fileupload");
const Helper = require("./../../common/Helper");
const helper = new Helper();
const { check, validationResult } = require('express-validator');
const ADMIN = "ADMIN";
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/courses')
    },
    filename: function (req, file, cb) {
      // file.fieldname + '-' +
      cb(null,Date.now())
    }
  })
const upload = multer({storage}).single('avatar');
exports.course =  utils.wrapAsync(async function(req,res){
    const {authtoken} = req.headers;
    const {role} = await helper.validateToken(authtoken);
    if (role !== ADMIN) {
        let err = errorHandler.createError("Not Authorized", 401, true);
        throw err;
	}
    // await check('course_name').notEmpty().withMessage({
    //     message: 'Please enter coursename'
    // }).run(req);
    // await check('description').isEmail().withMessage({
    //     message: 'Please enter course description'
    // }).run(req);
    // await check('start_time').isEmail().withMessage({
    //     message: 'Please enter start time course'
    // }).run(req);
    // await check('end_time').isEmail().withMessage({
    //     message: 'Please enter end time course'
    // }).run(req);
    // await check('days').isEmail().withMessage({
    //     message: 'Please enter start date of the course'
    // }).run(req);
    // const result = validationResult(req);     
	// if (!result.isEmpty()) {
	// 	return res.status(400).send({
	// 		error:true,
	// 		message:result.errors
	// 	});
	// }else{
        await upload(req, res, function (err) {
            if(err){
                console.log(err);
                return;
            }
            console.log(res);
        })
        const data = req.body;               
        await course(data);
        res.json({success:true,data});
   // }
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
        const course = await getCoursesById(id);
        res.json({success:true,data:course});
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