'use strict';

app.controller('UserDashCtrl', function ($scope, theUser, theFollowersOfUser) {
	$scope.user = theUser;
	$scope.theFollowers = theFollowersOfUser;
});