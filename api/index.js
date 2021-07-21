let user = require("./user");
exports.init = (router) => {
    router.post('/api/user',user.signup);
    router.post('/api/user/auth', user.signin);
    router.get('/api/user',user.getUser);
}

