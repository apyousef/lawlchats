var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var ChatRoom = new Schema({
    name: {type: String, default: 'lawlsac'},
    hash: String
});

module.exports = ChatRoom
