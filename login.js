var PlayMusic = require('playmusic');
var pm = new PlayMusic();
pm.login({email: "email@here.com", password: "password"}, function(err, login) {
    //Check for any kind of error
    if(err) console.error(err);
    
    //Return our nice code to use
    if(login) console.log(login);
})