'use strict';

app.factory('UserFactory', function($http) {

	var UserFactory = {};

	UserFactory.fetchAllUsers = function() {
		return $http.get('/api/users')
			.then(function(response) {
				return response.data;
			});
	};

	UserFactory.fetchAllStreamers = function() {
		return $http.get('/api/users/allStreamers')
			.then(function(response) {
				return response.data;
			});
	};

	UserFactory.fetchAllFollowersForOneStreamer = function(userId) {
		return $http.get('/api/users/' + userId +'/followers')
			.then(function(response) {
				return response.data;
			});
	};

	UserFactory.fetchById = function(userId) {
		return $http.get('/api/users/' + userId)
			.then(function(response) {
				return response.data;
			});
	};

	UserFactory.create = function(userInfo){
		return $http.post('/api/users', userInfo)
			.then(function(response){
				return response.data;
			});
	};

	UserFactory.update = function(userId, data){
		return $http.put('/api/users/' + userId, data)
			.then(function(response){
				return response.data;
			});
	};

	UserFactory.remove = function(userId){
		return $http.delete('/api/users/' + userId)
			.then(function(response){
				return response.data;
			});
	};

	return UserFactory;

});