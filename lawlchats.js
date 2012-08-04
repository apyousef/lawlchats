
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , common = require('./common.js');


var app = express();
var db_connector = common.db_connection;

db_connector.open(function(err, db){
	db.collectionNames(function(err, collections){
		if (err) { throw err; }
	});

	db.createCollection("test", function(err, collection){
		if (err) { throw err; }
	});

	db.createCollection("chatroom", function(err, collection){
		if (err) { throw err; }
	});

	db.createCollection("user", function(err, collection){
		if (err) { throw err; }
});

	db.createCollection("message", function(err, collection){
		if (err) { throw err; }
	});
});

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);



var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
  console.log("common = " + common.db_connection);
});

var io = require('socket.io').listen(server)

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
