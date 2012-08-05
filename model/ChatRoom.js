var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    common = require('../common.js');

var mongo_conn = common.mongo_conn,
    redis_client = common.redis_client;

var ChatRoom = new Schema({
    name: {type: String, default: 'lawlsac'},
    hash: String,
    users: [String],
    message_id_list: [String]
});

ChatRoom.method.enterRoom = function enterRoom(userString){
	if (this.users.indexOf(userString) == -1) {
		this.users.push(userString);
		return true;
	}
	return false;
};

ChatRoom.method.getChatRoom = function getChatRoom(){
	var messageObjects = {};
	var chatRoom = {
		name: this.name,
		hash: this.hash,
		users: this.users,
		messages: messageObjects
	};
	return chatRoom;
};

module.exports = mongo_conn.model('chatroom', ChatRoom);
