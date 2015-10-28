# express-cast
WORK IN PROGRESS

A local HTTP server built to run on your home network with node that exposes Chromecast functionality. As an interesting side effect of this you can Cast from ouside of your home network (using port forwording) and do some pretty cool other stuff.

### Getting started
In order to use Google Music you need to get a key first. If you use 2-Factor Authentication (which you absolutly should) then you'll need to set up a temporary [App Password](https://security.google.com/settings/security/apppasswords)

Once you set that up, fill out `login.js` with your info and then run it with
```
node login.js
```
If everything works you should get an Android ID and a Master Token which you stick in your config.

That's it, you are ready to go! Run it with
```
node index.js
```
