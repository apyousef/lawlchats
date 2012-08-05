var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    common = require('../common.js');

var mongo_conn = common.mongo_conn;

var Message = new Schema({
    message_text: String,
    user: {type:String, default:'anonymous'},
    url: {type:String, default:'http://media.treehugger.com/assets/images/2011/10/al-gore-newt-gingrich-climate.jpg'},
    timestamp: {type:Date, default:Date.now},
    chatroom: {type:ObjectId}
});

module.exports = mongo_conn.model('message', Message);