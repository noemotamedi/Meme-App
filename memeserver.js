console.log('hi')
// call the packages we need
var express    = require('express')      // call express
var bodyParser = require('body-parser')
var app        = express()     // define our app using express
var rmongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient
const assert = require('assert');
mongoose.connect('memeapp');
var User=require('./models/user');

// configure app to use bodyParser() and ejs
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','ejs');

// get an instance of the express Router
var router = express.Router();


// a “get” at the root of our web app: http://localhost:3000/api
router.get('/', function(req, res) {

  db.collection('cats').find({}).toArray((err, result) => {
    if(err) {console.log(err)}
    res.render('memeindex.ejs', {cats: result})
  })
});

router.post('/newPost', function(req, res) {
  console.log("POST!");  //logs to terminal
  var fName = req.body.firstName
  var lName = req.body.lastName
  db.collection('cats').insertOne({fName:fName, lName:lName})
  res.render('memeindex.ejs');  //renders index page in browser
});


// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
//==========================================================
var db
MongoClient.connect('mongodb://malbinson:berkeley@ds119436.mlab.com:19436/tester',{ useNewUrlParser: true }, (err, client) => {
    if(err) console.log(err)
    console.log("Connected successfully to server");

    db = client.db('tester');
    app.listen(3000, () => {
        console.log('meow')
    })
})
