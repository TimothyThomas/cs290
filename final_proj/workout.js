var express = require('express');
var session = require('express-session');
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
app.use(session({secret:'SuperSecretPassword'}));
app.use(express.static('public'));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/', function(req,res){
    res.render('home');
});


app.get('/getall',function(req,res,next){
    var context = {};
    pool.query('SELECT * from workouts', function(err, rows, fields){
        if(err){
            next(err);
            return;
        }
        res.type('text/plain');
        res.send(rows);
    });
});


app.post('/', function(req,res){
    var context = {};
    res.render('workout',context);
});


app.get('/insert', function(req,res,next){
    var context = {};
    pool.query("INSERT INTO workouts (`name`) VALUES (?)", [req.query.c], 
       //pool.query("INSERT INTO workouts (name, reps, weight, date, lbs) VALUES
       // ('Bench Press', 10, 225, '2016-01-01', 1),
       // ('Squat', 5, 315, '2016-01-03', 1),
       // ('Deadlift', 5, 405, '2016-01-05', 1);", [req.query.c], function(err, 
        function(err, result){
            if(err){
                next(err);
                return;
            }
            context.results = "Inserted id " + result.insertId;
            res.render('home', context)
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
