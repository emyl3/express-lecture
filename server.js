var express = require('express');
var bodyParser = require('body-parser');
var path = require('path'); //already exists on node so no npm install

var app = express();

app.use(bodyParser.urlencoded({extended: true}));

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

var songs = [];
app.post('/songs', function(req, res){
var date = new Date();
req.body.dateAdded = date.toDateString();
var x;
  if(req.body.title === '' || req.body.artist ===''){
    x = false;
  }
  songs.forEach(function(entry){
    var songTitle;
    var songArtist;
    songTitle = entry.title;
    songArtist = entry.artist;
    console.log('title', songTitle);
    console.log('artist', songArtist);
    if(songTitle === req.body.title && songArtist == req.body.artist){
      x = false;
    }
  });
  if(x === false){
    res.sendStatus(400).send('bad request');
  }
  else{
  songs.push(req.body);
  console.log('songs arary:', songs);
  res.sendStatus(200);
}
});

app.get('/songs', function(req, res){
  res.send(songs);
});

//path inside static is relative to where you started npm
//middleware for serving static files
//static files are files/assets that have content that doesn't change while the server is running
//all the stuff we need to see the client side

//takes anything inside this folder and makes it publicly available
app.use(express.static('public'));

//how we turn the server on
app.listen(3000);
