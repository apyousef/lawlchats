var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    common = require('../common.js'),
    sys = require('sys'),
    exec = require('child_process').exec;

var mongo_conn = common.mongo_conn,
    redis_client = common.redis_client;;

var MessageSchema = new Schema({
    messageText: String,
    user: {type:String, default:'anonymous'},
    url: {type:String, default:'http://media.treehugger.com/assets/images/2011/10/al-gore-newt-gingrich-climate.jpg'},
    timestamp: {type:Date, default:Date.now},
    roomId: String    // Hash of the room
});

MessageSchema.methods.pushToRedis = function pushToRedis(){
	var chatroom = require('./ChatRoom.js');
	redis_client.lpush(chatroom.getRedisKeyForId(this.roomId), this.toRedis());
};

MessageSchema.methods.toRedis = function toRedis(){
	return {
		'messageText': this.messageText,
		'user': this.user,
		'url': this.url,
		'timestamp': this.timestamp.toString(),
		'roomId': this.roomId
	};
};

MessageSchema.methods.getImage = function getImage(cb){
	var that = this;
	exec('python get_cat.py \"' + this.messageText + '\"', function(error, stdout, stderr){
		console.log("stdout  = " + stdout);
		if (error !== null){
			console.log("error = " + error);
		}
		else{
			cb(that);
		}
	});
};

module.exports = mongo_conn.model('message', MessageSchema);
