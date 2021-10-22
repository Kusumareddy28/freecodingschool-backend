const {getCoursesByQuery,getCoursesById,deleteCourse, updateCourse} = require('./courseModel');
const utils = require("./../../common/utils");
const {addCourse,uploadImage} =  require('./courseController');
const errorHandler = require('./../../common/error-handler');
// const multer = require('multer');
const Helper = require("./../../common/Helper");
const helper = new Helper();
const { check, validationResult } = require('express-validator');
const ADMIN = "ADMIN";

exports.addCourse =  utils.wrapAsync(async function(req,res){
    const image_name = await uploadImage(req,res)

    const {authtoken} = req.headers;
    const {role} = await helper.validateToken(authtoken);
    if (role !== ADMIN) {
        let err = errorHandler.createError("Not Authorized", 401, true);
        throw err;
	}
    // await check('course_name').notEmpty().withMessage({
    //     message: 'Course name is required'
    // }).run(req);
    // await check('description').isEmail().withMessage({
    //     message: 'Course description is required'
    // }).run(req);
    // await check('start_time').isEmail().withMessage({
    //     message: 'Start time is required'
    // }).run(req);
    // await check('end_time').isEmail().withMessage({
    //     message: 'End time is required'
    // }).run(req);
    // await check('days').isEmail().withMessage({
    //     message: 'Start date is required'
    // }).run(req);
    // const result = validationResult(req);     
	// if (!result.isEmpty()) {
	// 	return res.status(400).send({
	// 		error:true,
	// 		message:result.errors
	// 	});
	// }else{
        try{
            const {body} = req;
            const data = await addCourse({...body,image_name});
            res.json({success:true,data});
        }catch(e){
            let err = errorHandler.createError(e, 401, e);
            throw err;
        }        
   // }
});

exports.getCourse = utils.wrapAsync(async function(req,res){      
    try{
        let query = {};
        const {active} = req.query;
        if(active){         
            query.active = active;
        }  
        const course = await getCoursesByQuery(query);
        res.json({success:true,data:course});
    }catch(e){
        let err = errorHandler.createError(e, 401, e);
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

// exports.uploadCourseImage = utils.wrapAsync(async function(req, res){
//     const {authtoken} = req.headers;
//     const upload = multer({storage }).single('file');
//     upload(req,res,function(err,response) {
//         if(err) {
//             return res.end("Error uploading file.");
//         }
//         res.json({response});
//     });
//     // res.send(204)
// });

exports.activateCourse = utils.wrapAsync(async function(req, res){
    const {authtoken} = req.headers;
    const {role} = await helper.validateToken(authtoken);
    if (role !== ADMIN) {
        let err = errorHandler.createError("Not Authorized", 401, true);
        throw err;
	}
    await check('active').notEmpty().withMessage({
        message: 'Course status is required'
    }).run(req);  
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
    await check('id').notEmpty().withMessage({
        message: 'Course id is required'
    }).run(req);  
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