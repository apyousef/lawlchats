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

ChatRoomSchema.methods.enterRoom = function enterRoom(userString, cb){
	console.log("this.usersArray = " + this.usersArray);
	console.log("userString = " + userString);
	if (this.usersArray.indexOf(userString) == -1) {
		this.usersArray.push(userString);
		console.log("returning true");
		return true;
	}
	return true;
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

ChatRoomSchema.methods.getChatRoom = function getChatRoom(cb){
		var that = this;
		redis_client.lrange(ChatRoomSchema.statics.getRedisKeyForId(this.id), 0, -1, function(err, res){
				console.log("res = " + res);
				if(res)
				{
					console.log("true");
					if (res.length == 0)
					{
						console.log("res length is 0");
					}
				}
				else
				{
					console.log("false");
				}

				var json_res = [];
				if (res.length > 0)
				{
					console.log("res length is " + res.length);
					for (i in res){
						json_res.push(JSON.parse(res[i]));
					}
				}


				var chatRoom = {
					name: that.name,
					users: that.usersArray,
					messages: json_res
			};
			cb(chatRoom);
		});
};

module.exports = mongo_conn.model('chatroom', ChatRoomSchema);
