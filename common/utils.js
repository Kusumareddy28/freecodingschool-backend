const errorHandlingMiddleware = require('./error-handler').errorHandlingMiddleware;
module.exports = {
    wrapAsync: (fn) => {
    return function (req, res, next) {
        // Make sure to `.catch()` any errors and pass them along to the `next()`
        // middleware in the chain, in this case the error handler.
        fn(req, res, next).catch((err) => {
            errorHandlingMiddleware(err, req, res, next)
        });
    };
    },
    asBoolean: function (val) {
    if (val == undefined) return false;

    if (typeof (val) == 'boolean') return val;
    if (typeof (val) == 'number') return (val == 0) ? false : true;
    if (typeof (val) == 'string') {
        val = val.toLowerCase();
        return (val == 't' || val == 'true' || val == 'y' || val == 'yes' || val == 'on') ? true : false;
    }

    return true;
    },
    stringIsBoolean: function (val) {
    if (val == undefined) return false;

    if (typeof (val) == 'boolean') return true;
    if (typeof (val) == 'number') return false;
    if (typeof (val) == 'string') {
        val = val.toLowerCase();
        return (val == 'true' || val == 'false') ? true : false;
    }

    return false;
    }
}