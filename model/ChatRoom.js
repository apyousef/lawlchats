var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    common = require('../common.js');

var mongo_conn = common.mongo_conn,
    redis_client = common.redis_client;

var ChatRoomSchema = new Schema({
    name: {type: String, default: 'lawlsac'},
    usersArray: [String],
    messageIdArray: [String]
});

ChatRoomSchema.methods.enterRoom = function enterRoom(userString){
	console.log("this.usersArray = " + this.usersArray);
	console.log("userString = " + userString);
	if (this.usersArray.indexOf(userString) == -1) {
		this.usersArray.push(userString);
		console.log("returning true");
		return true;
	}
	console.log("returning false");
	return false;
};

ChatRoomSchema.methods.exitRoom = function exitRoom(userString){
	if (this.usersArray.indexOf(userString) != -1) {
		this.usersArray.pop(userString);
	}
};

ChatRoomSchema.methods.addMessage = function addMessage(messageId){
	this.messageIdArray.push(messageId);
};

ChatRoomSchema.statics.getRedisKeyForId = function getRedisKeyForId(roomId){
	return "chatroom." + roomId;
}

ChatRoomSchema.methods.getChatRoom = function getChatRoom(){
	var messageObjectArray = redis_client.lrange(ChatRoomSchema.statics.getRedisKeyForId(this.id), 0, -1);
	console.log("messageObjectArray = " + messageObjectArray);
	var chatRoom = {
		name: this.name,
		users: this.users,
		messages: messageObjectArray
	};
	return chatRoom;
};

module.exports = mongo_conn.model('chatroom', ChatRoomSchema);
