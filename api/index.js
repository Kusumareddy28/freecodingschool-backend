const user = require("./user");
const courses = require("./courses")
const testimonial = require("./testimonial")
exports.init = (router) => {
    router.post('/api/user',user.signup);
    router.post('/api/user/auth', user.signin);
    router.get('/api/user',user.getUser);
    router.post('/api/course',courses.addCourse);
    //router.post('/api/course/image',courses.uploadCourseImage);
    router.get('/api/course',courses.getCourse); 
    router.get('/api/course/:id',courses.getCourseById);
    router.patch('/api/course/:id',courses.activateCourse); 
    router.delete('/api/course',courses.deleteCourse);      
    router.post('/api/review',testimonial.review);
    router.get('/api/review',testimonial.getTestimonial);
}

