var custa=require('../modules/custQuery.js');
var linebot = require('linebot');
var postList = [
    { id: 1, name: "Apple", msg: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the gre‬" },
    { id: 2, name: "Zoe", msg: "The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymph. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta." },
    { id: 3, name: "Cathy", msg: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu" },
    { id: 4, name: "Cathy", msg: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu" },
    { id: 5, name: "Cathy", msg: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu" }

];
var count = postList.length;
var isLogin = false;
var checkLoginStatus = function(req, res){
    isLogin = false;
    if(req.signedCookies.userid && req.signedCookies.password){
        isLogin = true;
    }
};
//我的LINE
var bot = linebot({
    channelId: '1522300741',
    channelSecret: '455f74dac591d18ede2d996eb202f440',
    channelAccessToken:'PMYTOjEFFN7ZnBSMDdKUmtgkjod7Xkukm4g2LNyFGB7q6FsPFym2zhiUsN7GWbb5DkJEV1nPsOqmvZ81MaUTUdokXu0pxd/ZM9Vt5nxGdghJkveeo2MfWR7mhY6EuSfMv94qG6rZmkDPLn2Cz+ik1QdB04t89/1O/w1cDnyilFU='
});



//首頁

exports.index = function(req, res){
    checkLoginStatus(req, res);
    var custList =custa.query(924195, function(err,results) {
        console.log("out"+results[0].cust_no); // or whatever you need to do with the results
    });

    var custList2=custa.querywWithPromise(924195).then(function(res) {
        console.log("out"+res[0].cust_no);
    }).catch(function(e) {
        console.log(e);
    });


    res.render( 'index', {
        title : '測試-首頁',
        loginStatus : isLogin,
        posts : postList
    });
};

//登入頁面
exports.login = function(req, res){
    checkLoginStatus(req, res);
    res.render( 'login', {
        title : '測試-登入',
        loginStatus : isLogin
    });
};

//註冊頁面
exports.reg = function(req, res){
    checkLoginStatus(req, res);
    res.render( 'reg', {
        title : '測試-註冊',
        loginStatus : isLogin
    });
};

//註冊
exports.btn_reg = function(req, res){
    checkLoginStatus(req, res);
    if(req.body['password-repeat'] != req.body['password']){
        console.log('密碼輸入不一致。');
        console.log('第一次輸入的密碼：' + req.body['password']);
        console.log('第二次輸入的密碼：' + req.body['password-repeat']);
        return res.redirect('/reg');
    }
    else{
        //register success, redirect to index
        res.cookie('userid', req.body['username'], { path: '/', signed: true});
        res.cookie('password', req.body['password'], { path: '/', signed: true });
        return res.redirect('/');
    }
};

//登入
exports.btn_login = function(req, res){
    checkLoginStatus(req, res);
    if(req.body['password-repeat'] != req.body['password']){
        console.log('密碼輸入不一致。');
        console.log('第一次輸入的密碼：' + req.body['password']);
        console.log('第二次輸入的密碼：' + req.body['password-repeat']);
        return res.redirect('/reg');
    }
    else{
        //register success, redirect to index
        res.cookie('userid', req.body['username'], { path: '/', signed: true});
        res.cookie('password', req.body['password'], { path: '/', signed: true });
        return res.redirect('/');
    }
};

//執行登出
exports.logout = function(req, res){
    res.clearCookie('userid', { path: '/' });
    res.clearCookie('password', { path: '/' });
    return res.redirect('/');
};



exports.webhook = function(req, res){

    bot.parse(event);
    console.log(req.body);      // your JSON
    console.log("1");
    res.send(req.body);    // echo the result back
};

bot.on('message', function (event) {
    event.reply(event.message.text).then(function (data) {
        console.log('Success', data);
    }).catch(function (error) {
        console.log('Error', error);
    });
});

