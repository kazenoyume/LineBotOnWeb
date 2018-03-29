var sio = require('socket.io');
var io = null;
var io2 = null;
exports.io = function () {
    return io;
};
exports.io2 = function () {
    return io2;
};


exports.initialize = function(server) {
    io = sio(server);
    io2='connect';
    console.log('socket.io-test'+typeof (io));

    io.on('connection', function(socket) {
        console.log(socket.id+'connection ready');


        // 傳送時間訊息給瀏覽器
        setInterval(function() {

            socket.emit('date', {'date': new Date()});
        }, 1000);
        // Producer.startProducer();
        /*ditconsumer.start(function(value){
            io.emit('ditConsumer',value);
        });*/
        socket.on('createlogfile', function() {
            logsRecording.userLogs(function(filename) {
                socket.emit('filename', filename);
            });

        });
        socket.on('startrecording', function(filename) {
            console.log('response after creating file', filename);
            logsRecording.recordLogs(filename);
            //value that will be send it to file
        });
        socket.on('test', function(msg) {
            console.log('response after creating file test');

            //value that will be send it to file
        });
        socket.on('client_data', function(data) {
            console.log(data.msg);
        });
        socket.on('message', function(data) {
            console.log("server:"+data.msg);
            io.emit('message', {'msg':data.id+'說:'+data.msg});
        });

    });
    return io;
};