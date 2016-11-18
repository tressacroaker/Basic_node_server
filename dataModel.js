var mongoose = require("mongoose");

var dataSchema = new mongoose.Schema({
	name: {type: String},
	description: {type: String},
	image: {type: String}
});

module.exports = mongoose.model("Data", dataSchema);