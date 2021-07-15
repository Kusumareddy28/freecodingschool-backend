const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const swaggerUI = require('swagger-ui-express');
const createSwaggerExpressMiddleware = require('swagger-express-middleware');
const bodyParser = require('body-parser');
const {database} = require('./lib/database');
const swaggerDocument = require('./swagger.json');

require('dotenv').config();
const api = require('./api');
const app = express();
database();


// Add headers
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,cache-control,content-type,accept,authorization,AuthToken,RoleName');

  res.setHeader('Access-Control-Expose-Headers', 'AuthToken,RoleName');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));

app.use('/api/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

createSwaggerExpressMiddleware(swaggerDocument, app, (middlewareError, middleware) => {
  app.use(middleware.metadata(),
      middleware.parseRequest(),
      middleware.validateRequest());

  // Error handler to send the swagger validation response
  // app.use((err, req, res, next) => {
  //     err.statusCode = err.status;
  //     err.origin = req.protocol + '://' + req.get('host') + req.originalUrl;
  //     errorHandler.errorHandlingMiddleware(err, req, res, next);

  // });
});
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
