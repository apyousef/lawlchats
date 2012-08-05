
/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , http = require('http')
    , path = require('path')
    , common = require('./common.js');


var app = express();
var mongo_conn = common.mongo_conn;

var ChatRoom = require('./model/ChatRoom.js'),
    Message = require('./model/Message.js');

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(path.join(__dirname, 'static')));
    app.use(app.router);
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

app.get('/', routes.index);

app.post('/message/new', function(req, res){
  console.log("req.body.text = " + req.body.text);
  console.log("req.body.user = " + req.body.user);
  var m = new Message();
  m.user = req.body.user;
  m.message_text = req.body.text;
  m.save();
  
});

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
    var user = {};
    socket.on('join_room', function (data) {
        ChatRoom.findOne({name: data.room}, function (err, room) {
            console.log("room =" + room);
            if (room == null) {
                room = new ChatRoom();
                room.name = data.room;
            }
            if (room.enterRoom(data.username)) {
                socket.join(room.name);
                user.username = data.username;
                user.chatroom = room;
                room.save()
                room.getChatRoom(function(chatRoom){
                    socket.emit('chatroom', chatRoom);
                });
                io.sockets.in(room.name).emit('announce_user', {username: data.username});
            }
        })
    });

    socket.on('enter_message', function(data){
        if (user.chatroom) {
            console.log(data);
            var m = new Message();
            m.user = user.username;
            m.message_text = data.message_text;

            m.getImage(function(message){
                console.log("should emit here and update stuff.");
            });
            m.timestamp = Date.now();
            m.roomId = user.chatroom.id;
            m.save();


            user.chatroom.addMessage(m.id);
            user.chatroom.save();
            socket.emit('new_message', m.toRedis())
            m.pushToRedis();
        }
    });

    socket.on('disconnect', function () {
        if (user.chatroom) {
            user.chatroom.exitRoom(user.username);
            user.chatroom.save();
        }
    });
});

