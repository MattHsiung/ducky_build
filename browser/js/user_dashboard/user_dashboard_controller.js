'use strict';
var ducky = new Firebase("https://ducky.firebaseio.com/");

app.controller('UserDashCtrl', function ($scope, theFollowersOfUser, $firebaseObject, AuthService) {
	$scope.theFollowers = theFollowersOfUser;
	$scope.categories = [];

    AuthService.getLoggedInUser()
        .then(function(user) {
            $scope.user = user;
    })

    //populates the categories on scope with the topics
    $firebaseObject(ducky.child("categories")).$loaded()
        .then(function(data) {
            for (var key in data) {
                if (String(key).indexOf("$") === -1 && key !== "forEach") {
                    $scope.categories.push(key);
                }
            }
    })

	$scope.updateFirebase = function(data) {
        ducky.child('channel').child($scope.user.username).update(data);
	};
});