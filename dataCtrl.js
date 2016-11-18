var DataModel = require("./dataModel.js");
var mongoose = require("mongoose");

module.exports = {
	read: function(req, res){
		DataModel
		.find(req.query)
		.exec(function(err, result){
			if(err){
				res.send(err)
			}else{
				res.send(result)
			}
		});
	},
	create: function(req, res){
		var data = new DataModel(req.body);
		data
		.save(function(err, result){
			if(err){
				res.send(err)
			}else{
				res.send(result)
			}
		});
	},
	update: function(req, res){
		DataModel
		.findByIdAndUpdate(req.params.id, req.body,function(err, result){
				if(err){
					res.send(err)
				}else{
					res.send(result)
				}
		});

	},
	delete: function(req, res){
		DataModel
		.findByIdAndRemove(req.params.id, req.body, function(err, result){
			if(err){
					res.send(err)
				}else{
					res.send(result)
				}
		});
	}

};