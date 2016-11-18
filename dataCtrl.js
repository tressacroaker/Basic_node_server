var DataModel = require("./dataModel.js");

module.exports = {
	read: function(req, res){
		DataModel
		.find(req.query)
		.exec(function(err, result){
			if(err){
				req.send(err)
			}else{
				req.send(result)
			}
		});
	},
	create: function(req, res){
		var data = new DataModel(req.body);
		data
		.save(function(err, result){
			if(err){
				req.send(err)
			}else{
				req.send(result)
			}
		});
	},
	update: function(req, res){
		DataModel
		.findByIdAndUpdate(req.params.id, req.body,function(err, result){
				if(err){
					req.send(err)
				}else{
					req.send(result)
				}
		});

	},
	delete: function(req, res){
		DataModel
		.findByIdAndRemove(req.params.id, req.body, function(err, result){
			if(err){
					req.send(err)
				}else{
					req.send(result)
				}
		});
	}

};