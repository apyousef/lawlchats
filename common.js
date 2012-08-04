var mongo = require('mongodb'),
    mongoserver = new mongo.Server('localhost', mongo.Connection.DEFAULT_PORT),
    db_connection = new mongo.Db('lawlchatsnode', mongoserver),
    redis = require('redis'),
    redis_client = redis.createClient(6383, 'localhost');

Common = {
	mongoserver: mongoserver,
	db_connection: db_connection,
	redis_client: redis_client
};

module.exports = Common;
