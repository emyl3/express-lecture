var express = require('express');
var bodyParser = require('body-parser');
var path = require('path'); //already exists on node so no npm install
//when we require a file it means from our current directory (.) find a directory called routes
//then find the songs file and run it
//anything we write ourselves we use ./
var songRouter = require('./routes/songs');

var app = express();

//returns a function that knows how to take ANY request and finds any bodyencoded things
//and returns a javascript
//use applies to EVERY request
app.use(bodyParser.urlencoded({extended: true})); //post requests need to come after this body parser
//takes anything inside this folder and makes it publicly available
app.use(express.static('public'));

//for any request that starts with the /songs use the songRouter
//once something is matched in the first param it doesn't have to be matched in the router
app.use('/songs', songRouter);


app.post('/', function(req, res){
  console.log('req body =', req.body);
  res.sendStatus(200);
});

//this whole chunk is referred to as a route
app.get('/', function(req, res){
console.log('Received a request at', new Date());

//__dirname is the folder this file lives in
var filename = path.join(__dirname, 'public/views/index.html');
res.sendFile(filename);
console.log('filename', filename);
});

//have to do curl localhost:3000/kittens
app.get('/kittens', function(req, res) {
  //request has a query object that looks like what you put in after the url
  //ex 'localhost:3000/kittens?name=simone&age=2'
  // that would return { name: 'simone', age: '2'};
  console.log('Query params:', req.query);
  if(req.query.age > 2){
    res.send('MEOW');
  } else {
    res.send('meow');
  }
  res.send('meow');
});

//path inside static is relative to where you started npm
//middleware for serving static files
//static files are files/assets that have content that doesn't change while the server is running
//all the stuff we need to see the client side

//how we turn the server on
app.listen(3000);
