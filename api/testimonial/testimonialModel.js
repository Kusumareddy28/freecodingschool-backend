const mongoose = require('mongoose');

const roles = ["TEACHER", "STUDENT","VOLUNTEER"];

const testimonialSchema = new mongoose.Schema({
    email: { type: String, required: true,trim:true },  
    name: { type: String, required: true,trim:true },
    designation: { type: String, required: true ,trim:true},
    org_or_school: { type: String, required: true ,trim:true},
    review: { type: String, required: true ,trim:true},
    role: { type: String, enum: roles,required: true},
    createdAt:{
        type: Date,
        default: Date.now
    }  
    
},{timestamps: true});
const testimonial = mongoose.model('testimonial',testimonialSchema);
const getAllTestimonial = async () => {   
	const result = await testimonial.find().exec() 
    return result;  
}
const getTestimonialById = async(query) => {
	const result = testimonial.findOne({_id: parseInt(query)}).cursor(); 
    const response = await result.next(); 
    return response;
}
module.exports ={
    testimonial,
    testimonialSchema,
    getAllTestimonial,
    getTestimonialById
}
    

