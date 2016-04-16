var mongoose = require('mongoose');
require('../../../server/db/models/index');
var User = mongoose.model('User');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

describe('Users Route', function () {

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	var loggedInAgent;
	var tester;

	var signupInfo = {
		username:"test123",
		email: 'test123@test.test',
		password: 'test123'
	};

	var userInfo = {
		username:"test123",
		password: 'test123'
	};

	beforeEach('Create a user', function (done) {
		User.create(signupInfo, done)
	});

	beforeEach('Create loggedIn user agent and authenticate', function (done) {
		User.findOne({username:"test123"}).then(function(user) {tester = user});
		loggedInAgent = supertest.agent(app);
		loggedInAgent.post('/login').send(userInfo).end(done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

	describe('To see if get all users route works', function () {

		var guestAgent;

		beforeEach('Create guest agent', function () {
			guestAgent = supertest.agent(app);
		});

		it('gets all users', function (done) {
			guestAgent.get('/api/users/')
				.expect(200)
				.end(function (err, response) {
					if (err) return done(err);
					done();
				});
		});

	});

	describe('To see if get one user route works', function () {

		it('gets one user', function (done) {
			loggedInAgent.get('/api/users/' + tester._id)
				.expect(200).end(function (err, response) {
					if (err) return done(err);
					expect(response.body.email).to.equal('test123@test.test')
					done();
				});
		});
	
	});

	describe('To see if update one user works', function () {

		it('updates one user', function (done) {
			loggedInAgent.put('/api/users/' + tester._id)
				.send({imageUrl:"new image url"})
				.expect(201).end(function (err, response) {
					if (err) return done(err);
					done();
				});
		});
	
	});

	describe('To see if delete one user works', function () {

		it('deletes one user', function (done) {
			loggedInAgent.delete('/api/users/' + tester._id)
				.expect(200).end(function (err, response) {
					if (err) return done(err);
					done();
				});
		});
	
	});

});