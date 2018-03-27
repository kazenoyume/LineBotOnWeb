var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var partials = require('express-partials');
let linebot = require('linebot');
var router = require('./routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(partials());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('19900518'));
app.use(express.static(path.join(__dirname, 'public')));

//我的LINE
let bot = linebot({
    channelId: '1522300741',
    channelSecret: '455f74dac591d18ede2d996eb202f440',
    channelAccessToken:'PMYTOjEFFN7ZnBSMDdKUmtgkjod7Xkukm4g2LNyFGB7q6FsPFym2zhiUsN7GWbb5DkJEV1nPsOqmvZ81MaUTUdokXu0pxd/ZM9Vt5nxGdghJkveeo2MfWR7mhY6EuSfMv94qG6rZmkDPLn2Cz+ik1QdB04t89/1O/w1cDnyilFU='
});
const linebotParser = bot.parser();

app.get('/', router.index);
app.get('/logout', router.logout);
app.get('/login', router.login);
app.post('/login', router.btn_login);
app.get('/reg', router.reg);
app.post('/reg', router.btn_reg);
app.post('/webhook', linebotParser);




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
