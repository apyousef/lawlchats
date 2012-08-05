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

ChatRoom.method.getRedisKey()
{
	return "chatroom." + this.id;
}

ChatRoom.method.getChatRoom = function getChatRoom(){
	var messageObjectArray = redis_client.lrange(this.getRedisKey(), 0, -1);
	console.log("messageList = " + messageList);
	var chatRoom = {
		name: this.name,
		users: this.users,
		messages: messageObjectArray
	};
	return chatRoom;
};

module.exports = mongo_conn.model('chatroom', ChatRoom);
