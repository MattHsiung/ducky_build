'use strict';
var ducky = new Firebase("https://ducky.firebaseio.com/");

app.controller('UserDashCtrl', function ($scope, theUser, theFollowersOfUser, $firebaseObject) {
	$scope.user = theUser;
	$scope.theFollowers = theFollowersOfUser;
	$scope.categories = [];

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
        console.log(data);
        //test
        //ducky.child('channel').child('Ben').update(data);
	};
});