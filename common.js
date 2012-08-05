var mongoose = require('mongoose')
    //redis = require('redis'),
    //redis_client = redis.createClient(6383, 'localhost');

var redis = require('redis-url');
var redis_client = redis.connect(process.env.REDISTOGO_URL);

//var mongo_conn = mongoose.createConnection('mongodb://localhost:27017/lawlchatgoose');
var mongo_conn = mongoose.connect(process.env.MONGOHQ_URL);


Common = {
	mongo_conn: mongo_conn,
	redis_client: redis_client
};

module.exports = Common;
