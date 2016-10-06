var express = require('express');

//bring in the router from the express library
var router = express.Router(); //Router() express capitalizes it

var songs = [];
router.post('/', function(req, res){
  console.log('req.body:', req.body);
  songs.push(req.body);
  console.log('songs', songs);
  res.sendStatus(200);
});

router.get('/', function(req, res){
  res.send(songs);
});

//for localhost:3000/songs/favorite
router.get('/favorite', function(req, res){
  res.send({title: 'People are strange', artist:'Echo and the Bunnymen'});
});

module.exports = router;
//router object is only focused on creating routes
