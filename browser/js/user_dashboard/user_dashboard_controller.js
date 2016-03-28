'use strict';

app.controller('UserDashCtrl', function ($scope, $firebaseObject, theUser, $firebaseArray) {
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

    $firebaseObject(ducky.child('recent').child($scope.user.username))
        .$loaded(function(data) {
            $firebaseObject(ducky.child('channel').child(data.$value))
                .$loaded(function(data){
                    $scope.recent = data;
                })
        })

    //get all people who is following the streamer
    $firebaseArray(ducky.child('subscribers').child($scope.user.username))
        .$loaded(function(data){
            var subs=[];
            var weekFollower=0;
            angular.forEach(data, function(sub){
                subs.push(sub.$id)
                if ((Date.now()/1000) - sub.$value < 604800) weekFollower++;
            })
            $scope.subscribers = subs;
            $scope.weekFollower=weekFollower;
        })

    $firebaseArray(ducky.child('subscriptions').child($scope.user.username))
        .$loaded(function(data){
            var follow=[]
            angular.forEach(data, function(sub){
                follow.push(sub.$id)
            })
            $scope.subscriptions = follow;
        })
        
	$scope.updateFirebase = function(data) {
        ducky.child('channel').child($scope.user.username).update(data);
        alert("Your Channel has been updated")
        //want to redirect eventually to the channel
	};
});
