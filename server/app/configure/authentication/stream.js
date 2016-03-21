'use strict';
var _ = require('lodash');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Firebase = require("firebase");
var url = require('url');
var ducky = new Firebase("https://ducky.firebaseio.com/");

var FirebaseTokenGenerator = require("firebase-token-generator");
var tokenGenerator = new FirebaseTokenGenerator("Yn8pOTEBHpYwr9I4njqaN6XlFolJGBwbFRuPQH4A");

module.exports = function (app) {
    app.post('/auth/stream', function(req, res) {
	    console.log('authenticating stream');
        var key = req.body.name;
	    ducky.authWithCustomToken(key, function(error, authData) {
	    	if (error) {
	    		console.log("Invalid token", error);
	    		res.sendStatus(500);
	    	} else {
	    		console.log("Token is valid, begin stream at www.ducky.com/channels/" + authData.uid);
	    		res.location(authData.uid).sendStatus(300);
	    	}
	    });
	});
};
