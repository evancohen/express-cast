//Include dependencies for express-cast
var express = require('express');
var config = require('./config');
var PlayMusic = require('playmusic');
var YouTube = require('youtube-node');

var app = express();
var pm = new PlayMusic();
var youTube = new YouTube();

//Initiate Google Muisc
pm.init(config.gmusic, function(err, other) {
  if(err) console.error(err);
  // place code here
});

//Initiate YouTube key
youTube.setKey(config.youTubeKey);

//GET on the root, yo
app.get('/', function (req, res) {
  res.send({message: 'Ready to do your bidding!'});
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
//@param 'q' - search query
//@param 'type' - specify the type of the search: "music" or "video"
app.get('/search', function (req, res){
  if(req.query.q === undefined || req.query.type === undefined){
    error(req, "Required Paramaters: 'q' and 'type'");
  }
  
  if(req.query.type == 'all'){
    //Sloppy hack. Make this async.
    googlePlayMusicSearch(req.query.q, 1, function(err, data){
      youTubeSearch(req.query.q, 1, function(err2, data2){
        if(err || err2) error(req, {merror:err, yerror:err2})
        success(res, {GoogleMusic:data, YouTube:data2});
      });
    });
  }else if(req.query.type == 'music'){
    googlePlayMusicSearch(req.query.q, 1, function(err, data){
      if(err) error(req, err)
      success(res, data);
    });
  } else if(req.query.type == 'video'){
    youTubeSearch(req.query.q, 1, function(err, data){
      if(err) error(req, err)
      success(res, data);
    });
  }
});

//Google Play Music Search
//@param 'query' - the search to perform 
//@param 'count' - number of results
//@param callback()
function googlePlayMusicSearch(query, count, callback){
  pm.search(query, count, callback);
}

//YouTube Search
//@param 'query' - the search to perform 
//@param 'count' - number of results
//@param callback()
function youTubeSearch(query, count, callback){
  youTube.search(query, count, callback);
}

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