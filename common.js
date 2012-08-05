var mongoose = require('mongoose')
var redis = require('redis-url')
var redis_client = redis.connect(process.env.REDISTOGO_URL);
//redis = require('redis'),
//redis_client = redis.createClient(6383, 'localhost');

var mongo_conn = mongoose.createConnection('mongodb://localhost:27017/lawlchatgoose');


Common = {
	mongo_conn: mongo_conn,
	redis_client: redis_client
};

module.exports = Common;
