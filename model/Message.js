var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    common = require('../common.js');

var mongo_conn = common.mongo_conn;

var Message = new Schema({
    messageText: String,
    user: {type:String, default:'anonymous'},
    url: {type:String, default:'http://media.treehugger.com/assets/images/2011/10/al-gore-newt-gingrich-climate.jpg'},
    timestamp: {type:Date, default:Date.now},
    chatroom: String    // Hash of the room
});

module.exports = mongo_conn.model('message', Message);
