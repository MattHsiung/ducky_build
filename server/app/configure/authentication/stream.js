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
	    var streamUrl = url.parse(req.body.swfurl, true);
	    var key = streamUrl.query.key;

	    ducky.authWithCustomToken(key, function(error, authData) {
	    	if (error) {
	    		console.log("Invalid token", error);
	    		res.sendStatus(500);
	    	} else {
	    		console.log("Token is valid, begin stream at", authData.uid);
	    		res.sendStatus(200);
	    	}
	    });
	});
}

// { app: 'live',
//   flashver: 'FMLE/3.0 (compatible; obs-studi',
//   swfurl: 'rtmp://127.0.0.1/live?key=ajsdlfjsioewonvowiioefwwef',
//   tcurl: 'rtmp://127.0.0.1/live?key=ajsdlfjsioewonvowiioefwwef',
//   pageurl: '',
//   addr: '10.0.2.2',
//   clientid: '58',
//   call: 'publish',
//   name: 'sean',
//   type: 'live' }