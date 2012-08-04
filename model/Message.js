var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Message = new Schema({
    user: {type:String, default:'anonymous'},
    url: {type:String, default:'http://media.treehugger.com/assets/images/2011/10/al-gore-newt-gingrich-climate.jpg'},
    timestamp: {type:Date, default:Date.now},
    chatroom: {type:ObjectId}
});

module.exports = Message
