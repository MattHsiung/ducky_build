'use strict';
var ducky = new Firebase("https://ducky.firebaseio.com/");

app.config(function ($stateProvider) {

    $stateProvider.state('user_dashboard', {
        url: '/users/:userId',
        templateUrl: 'js/user_dashboard/user_dashboard.html',
        controller: 'UserDashCtrl',
        resolve: {
            theUser: function(UserFactory, $stateParams) {
                return UserFactory.fetchById($stateParams.userId);
            },
            theFollowersOfUser: function(UserFactory, $stateParams) {
                return UserFactory.fetchAllFollowersForOneStreamer($stateParams.userId);
            }
        }
    });

});