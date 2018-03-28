var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var partials = require('express-partials');
var bodyParser = require('body-parser');
let linebot = require('linebot');
var router = require('./routes');
//我的LINE
let bot = linebot({
    channelId: '1522300741',
    channelSecret: '455f74dac591d18ede2d996eb202f440',
    channelAccessToken:'PMYTOjEFFN7ZnBSMDdKUmtgkjod7Xkukm4g2LNyFGB7q6FsPFym2zhiUsN7GWbb5DkJEV1nPsOqmvZ81MaUTUdokXu0pxd/ZM9Vt5nxGdghJkveeo2MfWR7mhY6EuSfMv94qG6rZmkDPLn2Cz+ik1QdB04t89/1O/w1cDnyilFU='
});

var app = express();
const linebotParser = bot.parser();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(partials());
app.use(logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cookieParser('19900518'));
app.use(express.static(path.join(__dirname, 'public')));


app.all('/', router.index);
app.get('/logout', router.logout);
app.get('/login', router.login);
app.post('/login', router.btn_login);
app.get('/reg', router.reg);
app.post('/reg', router.btn_reg);
app.all('/webhook', linebotParser);




bot.on('message', function (event) {
    // 把收到訊息的 event 印出來
    var msg = "groupId:" + event.source.groupId + "  userId:" + event.source.userId + " text:" + event.message.text;

    console.log("收到:"+ msg);      // your JSON
    if (event.message.type = 'text') {
        var msg = event.message.text;
        event.reply(msg).then(function(data) {
            // success
            console.log(msg);
        }).catch(function(error) {
            // error
            console.log('error');
        });
    }
    if (event.message.text === 'now') {
        event.reply(msg).then(function(data) {
            // success.
            //ps4(1);
            //baha(1);
            console.log(msg);
        }).catch(function(error) {
            // error
            console.log('error');
        });
    }


    console.log(msg);
});


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
