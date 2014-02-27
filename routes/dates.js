
/*
 * Dates REST Services
 * 	
 */
//Importing lib
var mongoose = require('mongoose');

//Date Schema
var dateSchema = new mongoose.Schema({
	date : { type : Date, default : Date.now},
	place: { type : String, default: 'Place'}
});

//Setting up DB
mongoose.connect('mongodb://localhost/dates', function(err){
	if(err){
		console.log("Dates DB Error!");
	}
	else{
		console.log("Dates DB Loaded!");
	}
});

//Date Model
var dateModel = mongoose.model('dateModel',dateSchema);


exports.findAll = function(req,res){
	dateModel.find(null, function(err, data){
		if(err) console.log(err);
	res.send(data);
	});
};

exports.addDate = function(req,res){
	var date = new dateModel(req.body);
	date.save(function(err){
		console.log('Erreur à la sauvegarde de la date'+ date);
		res.send(err);
	});

};