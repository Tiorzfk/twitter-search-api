var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var Schema = new Schema({
	id: String,
	username: String,
	foto: String,
	tgl: String,
    latitude: Number,
    longitude: Number,
    tweet: String,
	status: String
});

mongoose.model("Tweet", Schema);
