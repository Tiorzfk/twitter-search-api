var mongoose = require('mongoose');

module.exports = function() {
	// mongoose.connect('mongodb://localhost:27017/divernity');
	mongoose.connect('mongodb://divernityapp:divernity2017@ds129333.mlab.com:29333/divernity');
	var db = mongoose.connection
	db.on('error', console.error.bind(console, 'connection error:'));
	db.on('open',function(){
		console.log('connected to mongo');
	});

	require('../app/models/tweetModel');
	return db;
};
