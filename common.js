var mongoose = require('mongoose');
var redis, redis_client, mongo_conn;

if (global.process.env.NODE_ENV=='production') {
    redis = require('redis-url');
    redis_client = redis.connect(process.env.REDISTOGO_URL);
    mongo_conn = mongoose.connect(process.env.MONGOHQ_URL);
} else {
    mongo_conn = mongoose.createConnection('mongodb://localhost:27017/lawlchatgoose');
    redis = require('redis'),
    redis_client = redis.createClient(6383, 'localhost');
}

Common = {
	mongo_conn: mongo_conn,
	redis_client: redis_client
};

module.exports = Common;
