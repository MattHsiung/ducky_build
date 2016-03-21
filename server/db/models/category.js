'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Scehma({ 
	name: {
		type: String,
		required: true,
		unique: true
	},
	imageUrl: {
		type: String,
		required: true
	}
})

mongoose.model('Category', schema)