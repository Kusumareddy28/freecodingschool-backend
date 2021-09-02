const mongoose = require('mongoose');
const days = ["Monday","Tuesday","Wednesday","Thursday","Friday"];
const courseSchema = new mongoose.Schema({      
    course_name: { type: String, required: true,trim:true },
    description: { type: String, required: true ,trim:true},
    days: { type: [String],enum: days,required: true ,trim:true},
    start_time: { type: String, required: true ,trim:true},
    end_time: { type: String, required: true ,trim:true},
    active:  { type: Boolean,  default: false},
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
	const result = courseModel.findOne({_id: query}).cursor(); 
    const response = await result.next(); 
    return response;
}
const updateCourse = async(id,active) => {
	const result = courseModel.findOneAndUpdate({_id: id},{$set:{active}}, {new: true}).exec()  
    // const response = await result.next(); 
    return result;
}
const deleteCourse = async(id) => {
	const result = courseModel.deleteOne({_id: id}).exec()  
    // const response = await result.next(); 
    return result;
}
module.exports ={
    courseModel,
    courseSchema,
    deleteCourse,
    getCoursesByQuery,
    updateCourse,
    getCoursesById
}
    

