var express = require("express");
var bodyParser = require("body-parser");
var cors = require('cors');
var mongoose = require('mongoose');

var dataCtrl = require('./dataCtrl.js')

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + '/public'));




app.post('/data',dataCtrl.create);
app.get('/data',dataCtrl.read);
app.put('/data/:id',dataCtrl.update);
app.delete('/data/:id',dataCtrl.delete);



mongoose.connect("mongodb://localhost: 27017/dataDb");
mongoose.connection.once('open', function(){
	console.log("connected to mongo on 27017");
});

app.listen(8000, function(){
	console.log('listening on port 8000');
});

