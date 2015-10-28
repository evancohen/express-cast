//Simple server that exposes your Chromecast devices over HTTP to make home automation easier

var PlayMusic = require('playmusic');
var config = require('./config');
var pm = new PlayMusic();

pm.init({email: config.gmusic.email, password: config.gmusic.email}, function(err) {
    if(err) console.error(err);
    // Something has gone terribly wrong. Check your username and password
    
})