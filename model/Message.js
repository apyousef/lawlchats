var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    common = require('../common.js');

var mongo_conn = common.mongo_conn,
    redis_client = common.redis_client;;

var Message = new Schema({
    messageText: String,
    user: {type:String, default:'anonymous'},
    url: {type:String, default:'http://media.treehugger.com/assets/images/2011/10/al-gore-newt-gingrich-climate.jpg'},
    timestamp: {type:Date, default:Date.now},
    roomId: String    // Hash of the room
});

Message.method.pushToRedis = function pushToRedis(){
	var chatroom = require('./ChatRoom.js');
	redis_client.lpush(chatroom.getRedisKeyForId(this.roomId), this.toRedis());
};

Message.method.toRedis = function toRedis(){
	return {
		'messageText': this.messageText,
		'user': this.user,
		'url': this.url,
		'timestamp': this.timestamp.toString(),
		'roomId': this.roomId
	};
};

module.exports = mongo_conn.model('message', Message);
