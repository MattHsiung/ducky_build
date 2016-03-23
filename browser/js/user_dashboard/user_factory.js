'use strict';

app.factory('UserFactory', function($http) {

	var UserFactory = {};

	UserFactory.fetchAllUsers = function() {
		return $http.get('/api/users')
			.then( response => response.data);
	};

	UserFactory.fetchAllStreamers = function() {
		return $http.get('/api/users/allStreamers')
			.then( response => response.data);
	};

	UserFactory.fetchAllFollowersForOneStreamer = function(userId) {
		return $http.get('/api/users/' + userId +'/followers')
			.then( response => response.data);
	};

    UserFactory.followUser =  function (userId, userToFollowId){
        return $http.put('/api/users/' + userId + '/followers/' + userToFollowId)
            .then( response => response.data);
    }

    UserFactory.unfollowUser = function (userId, userToUnfollowId){
        return $http.put('/api/users/' + userId + '/followers/' + userToUnfollowId)
            .then( response => response.data);
    }

	UserFactory.fetchById = function(userId) {
		return $http.get('/api/users/' + userId)
			.then( response => response.data);
	};

	UserFactory.create = function(userInfo){
		return $http.post('/api/users', userInfo)
			.then( response => response.data);
	};

	UserFactory.update = function(userId, data){
		return $http.put('/api/users/' + userId, data)
			.then( response => response.data);
	};

	UserFactory.remove = function(userId){
		return $http.delete('/api/users/' + userId)
			.then( response => response.data);
	};

	return UserFactory;

});
