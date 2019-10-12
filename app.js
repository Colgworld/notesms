var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const http = require('http');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

// Routes
var indexRouter = require('./routes/index');
var signinRouter = require('./routes/signin');
var registerRouter = require('./routes/register');
var usersRouter = require('./routes/users');
var smsRouter = require('./routes/sms');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Views
app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/signin', signinRouter);
app.use('/users', usersRouter);
app.use('/sms', smsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});


module.exports = app;
