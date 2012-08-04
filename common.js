var mongo = require('mongodb'),
    mongoserver = new mongo.Server('localhost', mongo.Connection.DEFAULT_PORT)
    db_connection = new mongo.Db('lawlchatsnode', mongoserver)

Common = {
	mongoserver: mongoserver,
	db_connection: db_connection
};

module.exports = Common;
