//Simple server that exposes your Chromecast devices over HTTP to make home automation easier

var express = require('express');
var PlayMusic = require('playmusic');
var config = require('./config');

var pm = new PlayMusic();
var app = express();

//Initiate Google Muisc
pm.init(config.gmusic, function(err, other) {
  if(err) console.error(err);
  // place code here
})

//GET on the root, yo
app.get('/', function (req, res) {
  res.send('Ready to do your bidding!');
});

app.get('/song', function (req, res) {
  var response = {};
  pm.getAllTracks(function(err, library) {
    var song = library.data.items.pop();
    response.song = song;
    pm.getStreamUrl(song.id, function(err, streamUrl) {
        response.streamUrl = streamUrl;
        res.send(response);
    });
  });
});



//Listen on desired port 
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Ready to do your bidding at http://%s:%s', host, port);
});