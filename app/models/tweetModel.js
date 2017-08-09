var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var Schema = new Schema({
	id: String,
	id_str: String,
	username: String,
	foto: String,
	tgl: String,
    latitude: Number,
    longitude: Number,
    tweet: String,
	status: String,
	lokasi : String
});

mongoose.model("Tweet", Schema);
