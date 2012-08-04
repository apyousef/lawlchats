var mongoose = require('mongoose'),
    redis = require('redis'),
    redis_client = redis.createClient(6383, 'localhost');

var mongo_conn = mongoose.createConnection('mongodb://localhost:27017/lawlchatgoose');


Common = {
	mongo_conn: mongoose.connection,
	redis_client: redis_client
};

module.exports = Common;
