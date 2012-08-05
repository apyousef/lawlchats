var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    common = require('../common.js');

var mongo_conn = common.mongo_conn,
    redis_client = common.redis_client;

var ChatRoom = new Schema({
    name: {type: String, default: 'lawlsac'},
    usersArray: [String],
    messageIdArray: [String]
});

ChatRoom.method.enterRoom = function enterRoom(userString){
	if (this.usersArray.indexOf(userString) == -1) {
		this.usersArray.push(userString);
		return true;
	}
	return false;
};

ChatRoom.method.exitRoom = function exitRoom(userString){
	if (this.usersArray.indexOf(userString) != -1) {
		this.usersArray.pop(userString);
	}
};

ChatRoom.method.addMessage = function addMessage(messageId){
	this.messageIdArray.push(messageId);
};

ChatRoom.statics.getRedisKeyForId = function getRedisKeyForId(roomId){
	return "chatroom." + roomId;
}

ChatRoom.method.getChatRoom = function getChatRoom(){
	var messageObjectArray = redis_client.lrange(ChatRoom.getRedisKeyForId(this.id), 0, -1);
	console.log("messageList = " + messageList);
	var chatRoom = {
		name: this.name,
		users: this.users,
		messages: messageObjectArray
	};
	return chatRoom;
};

module.exports = mongo_conn.model('chatroom', ChatRoom);
