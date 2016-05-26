var express = require('express');
var session = require('express-session');
var request = require('request');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({secret:'SuperSecretPassword'}));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/',function(req,res,next){
    var context = {};
    // if no session, got to main page
    if(!req.session.username){
        res.render('newSession', context);
        return;
    }

    // Get spot price in USD
    var spot = 0.0;
    request('https://api.coinbase.com/v2/prices/spot?currency=USD',
        function (err, response, body) {
            if (!err && response.statusCode < 400) {
                var resText = JSON.parse(body);
                spot = Number(resText.data.amount); 
                context.username = req.session.username;
                context.trans = req.session.trans || [];
                context.balanceBTC = req.session.balance || 0.0;
                context.balanceUSD = spot * context.balanceBTC; 
                res.render('account',context);
            } else {
                if(response){
                    console.log(response.statusCode);
                }
              next(err);
            }
        });
});


app.post('/', function(req,res){
    var context = {};

    if(req.body['New Account']){
        req.session.username = req.body.username;
        req.session.trans = [];
        req.session.curId = 0;
        req.session.balance = 0.0;
    } 

    // if no session, go to main page
    if(!req.session.username){
        res.render('newSession', context);
        return;
    }

    if(req.body['Add Transaction']){
        req.session.trans.push({"label":req.body.transLabel,
                                "amount":req.body.transAmount,
                                "id":req.session.curId})
        req.session.curId++;
        req.session.balance += Number(req.body.transAmount);
    }

    if(req.body['Erase']){
        req.session.trans = req.session.trans.filter(function(e){
            return e.id != req.body.id;
        })
        req.session.balance -= req.body.amount;
    }

    request('https://api.coinbase.com/v2/prices/spot?currency=USD',
        function (err, response, body) {
            if (!err && response.statusCode < 400) {
                var resText = JSON.parse(body);
                spot = Number(resText.data.amount); 
                context.username = req.session.username;
                context.trans = req.session.trans || [];
                context.balanceBTC = req.session.balance;
                context.balanceUSD = spot * context.balanceBTC; 
                request({
                    "url":"http://httpbin.org/post",
                    "url":"http://52.36.110.171:3001/loopback",
                    "method":"POST",
                    "headers":{
                        "Content-Type":"application/json"
                    },
                    "body":'{"foo":"bar","number":1}'
                }, function(err, response, body){
                    if(!err && response.statusCode < 400){
                        context.httpbin = body;
                        console.log(body)
                        res.render('account',context);
                    } else{
                        console.log(err);
                        if(response){
                            console.log(response.statusCode);
                        }
                        next(err);
                    }
                });
            } else {
                console.log(err);
                if(response){
                    console.log(response.statusCode);
                }
                next(err);
            }
    });
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
