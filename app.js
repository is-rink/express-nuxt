var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var { Nuxt, Builder } = require('nuxt');

var apiRouter = require('./api/index');

var app = express();

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', apiRouter);

// instantiate nuxt.js with the options
const config = require('./nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production');
const nuxt = new Nuxt(config)

// render every route with Nuxt.js
app.use(nuxt.render)

// build only in dev mode with hot-reloading
if (config.dev) {
  new Builder(nuxt).build();
}

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

module.exports = app;
