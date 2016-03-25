var Firebase = require("firebase");
var ducky = new Firebase("https://ducky.firebaseio.com/channel/");
var rp = require('request-promise');
var parser = require('xml2json');

var options = {
	method: 'GET',
	uri: 'http://192.168.68.8/stat'
};

module.exports = function() {
	rp(options)
		.then(stats => {
			var jsonString = parser.toJson(stats);
			var json = JSON.parse(jsonString);
			var streams = json.rtmp.server.application[1].live.stream;
			if (!Array.isArray(streams)) streams = [streams];
			streams.forEach(stream => {
                if(!stream) return;
				var username = stream.name;
				var viewers = Number(stream.nclients);
				ducky.child(username).update({ views: viewers });
			});
		})
		.then(null, err => {
			console.error(err);
		});
};
