let express = require('express');
let router = express.Router();
let user = require("./user");
router.post('/user', user.signup);
router.post('/user/auth', user.signin);
module.exports = router;
