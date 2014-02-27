
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var app = express();
//Modules
var articles =require('./routes/articles');
var dates =require('./routes/dates');
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

//Articles routes
app.get('/articles', articles.findAll);
app.get('/articles/last', articles.findLast);
app.get('/articles/last/:num', articles.findLast);
app.get('/articles/:id', articles.findbyId);
app.post('/articles', articles.addArticle);
app.put('/articles/:id', articles.updateArticle);
app.del('/articles/:id', articles.deleteArticle);

//Dates routes
app.get('/dates', dates.findAll);
app.post('/dates', dates.addDate);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
