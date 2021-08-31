const mongoose = require('mongoose');
const days = ["Monday","Tuesday","Wednesday","Thursday","Friday"];
const courseSchema = new mongoose.Schema({      
    course_name: { type: String, required: true,trim:true },
    description: { type: String, required: true ,trim:true},
    days: { type: [String],enum: days,required: true ,trim:true},
    start_time: { type: String, required: true ,trim:true},
    end_time: { type: String, required: true ,trim:true},
    createdAt:{
        type: Date,
        default: Date.now
    }  
    
},{timestamps: true});
const courseModel = mongoose.model('Course',courseSchema);
const getCoursesByQuery = async (query) => {   
	const result = await courseModel.find(query).exec() 
    return result;  
}
const getCoursesById = async(query) => {
	const result = courseModel.findOne({_id: parseInt(query)}).cursor(); 
    const response = await result.next(); 
    return response;
}
module.exports ={
    courseModel,
    courseSchema,
    getCoursesByQuery,
    getCoursesById
}
    

