const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const prettyjson = require('prettyjson');
const hbs = require('hbs');

// set up our routes
const index = require('./routes/index');
const authenticationApi = require('./routes/api/authentication');

const app = express();

// set up prettyjson
const prettyJsonOptions = {
    keysColor: 'green',
    dashColor: 'magenta',
    stringColor: 'white',
    indent: 5
}

// config a console debugger
const debug = require('debug')(`${process.env.APP_NAME.toLowerCase()}:app`);

// view engine setup
hbs.registerPartials(__dirname + '/views/partials');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api/authentication', authenticationApi);

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
