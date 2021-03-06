var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

const productRouter = require('./routes/product');
const loginRouter = require('./routes/auth/login');
const registerRouter = require('./routes/auth/register');
const negotiateRouter = require('./routes/price/negotiate');
const askpriceRouter = require('./routes/price/asked-prices');

var app = express();

// connection to database
const connect = mongoose.connect('mongodb://localhost:27017/techcarrel', ()=>{
  console.log("Connected to database");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes 
app.use('/product', productRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/negotiate', negotiateRouter);
app.use('/askprice', askpriceRouter);

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
