
/*
 * Articles REST Services
 * 	
 */
//Importing lib
var nStore = require('nstore');
nStore = nStore.extend(require('nstore/query')());
//Setting up DB
var db = nStore.new('articles.db',function(){
	console.log('Articles DB Loaded!');
});

/*
 * Routes fonctions
 * findAll()
 * findLast() 
 * findbyId()
 * addArticle()
 * updateArticle()
 * deleteArticle()
 * 
 */

// findAll the articles in db
exports.findAll = function(req, res){
	db.all(function(err, results){
		//Check for errors
		if (err){
			console.log('Error with database' ,err);
			res.send(err);
		}else{
			var articles =[], key;
			//Parse the results
			for (key in results){
				var article = results[key];
				article.id = key;
				articles.push(article);
			}
			res.json(articles);
		}
	});
};

//Find the last article in db
exports.findLast = function(req, res){
	var num;
	db.all(function(err, results){
		//Check for errors
		if (err){
			console.log('Error whith database' ,err);
			res.send(err);
		}else{
			var articles =[], key;
			//Parse the results
			for (key in results){
				var article = results[key];
				article.id = key;
				articles.push(article);
			}
			if(req.params.num < articles.length){
				num = req.params.num;	
			}else{
				num = 1;
			}
			console.log("results"+articles[num]);
			console.log("num:"+num);
			res.json(articles[articles.length -num]);
		}
	});
}

//Find an article by id
exports.findbyId = function(req,res){
	db.get(req.params.id, function(err, article, key){
		//Check for errors
		if (err){
			console.log('Error whith database' ,err);
			res.send(err);
		}else{
			article.id = key;
			res.json(article);
		}
	});
};
// Add an article in the db
exports.addArticle = function(req,res){
	var date = new Date(), model = req.body;
	model.saveDate = (date.toLocaleDateString());
	//Saving the article
	db.save(null, model ,function(err, key){
		//Check for errors
		if (err){
			console.log('Error whith database' ,err);
			res.send(err);
		}else{
			model.id = key;
			res.json(model);
		}
	});
};
//Update an article in the db
exports.updateArticle = function(req, res){
	var date = new Date(), model = req.body;
	model.saveDate = (date.valueOf());
	//Saving the article
	db.save(req.params.id, model ,function(err, key){
		//Check for errors
		if (err){
			console.log('Error whith database' ,err);
			res.send(err);
		}else{
			res.json(model);
		}
	});
};
//Delete an article in the db
exports.deleteArticle = function(req,res){
	db.remove(req.params.id, function(err){
		//Check for errors
		if (err){
			console.log('Error whith database' ,err);
			res.send(err);
		}else{
			//RE-open DB
			var db = nStore.new('articles.db',function(){
				res.json(req.params.id);
			});
		}
	});
}
