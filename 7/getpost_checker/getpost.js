var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3001);

app.get('/', function(req,res){
    res.render('home');
});


app.get('/loopback',function(req,res){
    var qParams = [];
    for (var p in req.query){
        qParams.push({'name':p,'value':req.query[p]})
    }
    var context = {};
    context.dataList = qParams;
    context.type = "GET";
    res.render('get-loopback', context);
});


app.post('/loopback', function(req,res){
    var qParams = [];
    for (var p in req.query){
        qParams.push({'name':p,'value':req.query[p]})
    }
    var bodyParams = [];
    for (var p in req.body){
        bodyParams.push({'name':p,'value':req.body[p]})
    }
    var context = {};
    context.qList = qParams;
    context.bodyList = bodyParams;
    res.render('post-loopback', context);
});


app.use(function(req,res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});


app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});


app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
