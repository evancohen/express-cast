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

//This is for testing. Get all of your songs and then show details about the first one on the list
app.get('/song', function (req, res) {
  var response = {};
  pm.getAllTracks(function(err, library) {
    if(err) error(req, {message: "Could not get tracks", error: err});
    var song = library.data.items.pop();
    response.song = song;
    pm.getStreamUrl(song.id, function(err, streamUrl) {
      if(err) error({message: "Could not get track details", error: err});
      response.streamUrl = streamUrl;
      success(response);
    });
  });
});

//Search for a song and return the results
app.get('/search', function (req, res){
  if(req.query.q === undefined){
    error(req, "Missing paramater: q");
  }
  pm.search(req.query.q, 5, function(err, data) { // max 5 results
    var song = data.entries.sort(function(a, b) { // sort by match score
      return a.score < b.score;
    }).shift(); // take first song
    success(res, song);
  }, function(message, body, err, httpResponse) {
      console.log('what is this', message);
  });
});
  
 
// Some helper functions for responses
function success(res, body){
  sendResponse(res, "Success", body);
}

function error(res, body){
  sendResponse(res, "Error", body);
}

function sendResponse(res, status, body){
  var response = {}
  response.status = status;
  response.body = body;
  res.send(response);
}

//Listen on desired port 
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Ready to do your bidding at http://%s:%s', host, port);
});