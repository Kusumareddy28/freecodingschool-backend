const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
       
    name: { type: String, required: true,trim:true },
    designation: { type: String, required: true ,trim:true},
    org_or_school: { type: String, required: true ,trim:true},
    review: { type: String, required: true ,trim:true},
    createdAt:{
        type: Date,
        default: Date.now
    }  
    
},{timestamps: true});
const testimonial = mongoose.model('Testimonial',testimonialSchema);
const getTestimonialByQuery = async (query) => {   
	const result = testimonial.findOne(query).cursor();  
    const response = await result.next();
    return response;  
}
const getTestimonialById = async(query) => {
	const result = testimonial.findOne({_id: parseInt(query)}).cursor(); 
    const response = await result.next(); 
    return response;
}
module.exports ={
    testimonial,
    testimonialSchema,
    getTestimonialByQuery,
    getTestimonialById
}
    

