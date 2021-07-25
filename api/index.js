let user = require("./user");
let courses = require("./courses")
let testimonial = require("./testimonial")
exports.init = (router) => {
    router.post('/api/user',user.signup);
    router.post('/api/user/auth', user.signin);
    router.get('/api/user',user.getUser);
<<<<<<< HEAD
=======
    router.post('/api/admin/courses',courses.course);
    router.post('/api/user/testimonial',testimonial.review);
>>>>>>> test
}

