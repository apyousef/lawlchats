var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    common = require('../common.js');

var mongo_conn = common.mongo_conn;

var ChatRoom = new Schema({
    name: {type: String, default: 'lawlsac'},
    hash: String
});

module.exports = mongo_conn.model('chatroom', ChatRoom);
