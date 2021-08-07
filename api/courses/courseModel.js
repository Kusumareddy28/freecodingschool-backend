const mongoose = require('mongoose');

const coursesSchema = new mongoose.Schema({      
    course_name: { type: String, required: true,trim:true },
    description: { type: String, required: true ,trim:true},
    date: { type: String, required: true ,trim:true},
    time: { type: String, required: true ,trim:true},
    createdAt:{
        type: Date,
        default: Date.now
    }  
    
},{timestamps: true});
const courses = mongoose.model('Courses',coursesSchema);
const getCoursesByQuery = async (query) => {   
	const result = courses.findOne(query).cursor();  
    const response = await result.next();
    return response;  
}
const getCoursesById = async(query) => {
	const result = courses.findOne({_id: parseInt(query)}).cursor(); 
    const response = await result.next(); 
    return response;
}
module.exports ={
    courses,
    coursesSchema,
    getCoursesByQuery,
    getCoursesById
}
    

