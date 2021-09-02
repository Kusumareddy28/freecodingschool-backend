let user = require("./user");
let courses = require("./courses")
let testimonial = require("./testimonial")
exports.init = (router) => {
    router.post('/api/user',user.signup);
    router.post('/api/user/auth', user.signin);
    router.get('/api/user',user.getUser);
    router.post('/api/course',courses.course);
    router.get('/api/course',courses.getCourse); 
    router.get('/api/course/:id',courses.getCourseById); 
    router.delete('/api/course',courses.deleteCourse);      
    router.post('/api/review',testimonial.review);
    router.get('/api/review',testimonial.getTestimonial);
}

