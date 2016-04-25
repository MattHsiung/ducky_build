'use strict';
app.controller('UserDashCtrl', function ($scope, $state, user, categories, info, subscriptions, subscribers, recent, ChannelInfoFactory) {
    $scope.user = user;
    $scope.categories = categories;
    $scope.userInfo = info;
    $scope.recent = recent;
    $scope.subscriptions = subscriptions;
    $scope.subscribers = subscribers;
	$scope.updateChannel = function(newInfo) {
        ChannelInfoFactory.updateInfo($scope.user.username, newInfo);
        $state.go('channel', {username: $scope.user.username});
    };
});
