'use strict';

app.controller('UserDashCtrl', function ($scope, $firebaseObject, theUser) {
    var ducky = new Firebase("https://ducky.firebaseio.com/");
    
	$scope.categories = [];
    $scope.user = theUser;

    //populates the categories on scope with the topics
    $firebaseObject(ducky.child("categories")).$loaded()
        .then(function(data) {
            for (var key in data) {
                if (String(key).indexOf("$") === -1 && key !== "forEach") {
                    $scope.categories.push(key);
                }
            }
        })

    //get the metadata on the streamer
    $firebaseObject(ducky.child('channel').child($scope.user.username)).$loaded()
        .then(function(data) {
            $scope.userInfo = data;
        })

    //get all people who is following the streamer
    $firebaseObject(ducky.child('subscribers')).$loaded()
        .then(function(data) {
            var temp = [];
            for (var key in data) { 
                if (String(key).indexOf("$") === -1 && data[key][$scope.user.username]) {
                    temp.push(key);
                }
            }
            return temp;
        })
        .then(function(data) {
            $scope.numOfFollowers = data.join(", ");
        })


	$scope.updateFirebase = function(data) {
        ducky.child('channel').child($scope.user.username).update(data);
        alert("Your Channel has been updated")
        //want to redirect eventually to the channel
	};
});