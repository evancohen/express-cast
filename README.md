# express-cast
A local HTTP server running node that exposes Chromecast functionality

## Getting started
In order to use Google Music you need to get a key first. If you use 2-Factor Authentication (which you absolutly should) then you can set up a temporary (App Password)[https://security.google.com/settings/security/apppasswords]

Once you set that up, fill out `login.js` with your info and then run it with
```
node login.js
```
If everything works as it should you should get an Android ID and a Master Token which you stick in your config.

That's it, you are ready to go!