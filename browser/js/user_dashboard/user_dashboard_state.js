'use strict';

app.config(function ($stateProvider) {

    $stateProvider.state('user_dashboard', {
        url: '/users/:userId',
        templateUrl: 'js/user_dashboard/user_dashboard.html',
        controller: 'UserDashCtrl',
        resolve: {
            theUser: function(AuthService, $stateParams) {
                return AuthService.getLoggedInUser()
            },
            theFollowersOfUser: function(UserFactory, $stateParams) {
                return UserFactory.fetchAllFollowersForOneStreamer($stateParams.userId);
            }
        }
    });

});