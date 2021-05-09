var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');
const { Sequelize } = require('sequelize');
var session = require('express-session')
var app = express();
require("./util");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(cors());
app.use(cors());
app.use(session({
  secret: '!R0zlzF',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Init Database Config
global["sequelize"] = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

// var databaseName = 'db_test';
// var username = 'root';
// var password = '';
// var host = 'localhost';

// global["sequelize"] = new Sequelize(databaseName, username, password, {
//   host: host,
//   dialect: 'mysql'
// });

async function initialize() {
  console.log("###################");
  include_dir("shared");
  include_dir("module");
  console.log("###################");
  await db.connect();

  app.use('/', indexRouter);
  app.use('/users', usersRouter);
  app.use('/api', apiRouter);


  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
}
initialize();

module.exports = app;
