var express = require('express');
var request = require('request');
var mysql = require('mysql')
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '10%percent',
    database: 'mysql'
    //user: 'student',
    //password: 'default',
    //database: 'student'
});

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/', function(req,res){
    res.render('home');
});


app.post('/delete', function(req,res) {
    pool.query('DELETE FROM workouts WHERE id = (?)', [req.body.id], function(err, result){
        if(err) {
            next(err);
            return;
        }
        pool.query("SELECT * from workouts", function(err, rows, fields){
            if(err){
                next(err);
                return;
            }
            res.type('text/plain');
            res.send(rows);
        });
    });
});

app.get('/getall',function(req,res,next){
    pool.query('SELECT * from workouts', function(err, rows, fields){
        if(err){
            next(err);
            return;
        }
        res.type('text/plain');
        res.send(rows);
    });
});

app.post('/insert', function(req,res,next){
    pool.query("INSERT INTO workouts (date, name, reps, weight, lbs) VALUES (?,?,?,?,?)", 
        [req.body.date, req.body.name, req.body.reps, req.body.weight, req.body.units], function(err, result) {
        if(err) {
            next(err);
            return;
        }
        pool.query("SELECT * from workouts", function(err, rows, fields){
            if(err){
                next(err);
                return;
            }
            res.type('text/plain');
            res.send(rows);
        });
    });
});

app.get('/insert', function(req,res,next){
    pool.query("INSERT INTO workouts (date, name, reps, weight) VALUES (?,?,?,?)", 
       [req.query.date, req.query.name, req.query.reps, req.query.weight], function(err, result) {
            if(err){
                next(err);
                return;
            }
            context.results = "Inserted id " + result.insertId;
            res.render('home')
    });
});


app.get('/reset-table',function(req,res,next){
  var context = {};
  pool.query("DROP TABLE IF EXISTS workouts", function(err){ 
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('home',context);
    })
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
