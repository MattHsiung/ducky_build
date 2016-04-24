'use strict';

app.config(function ($stateProvider) {

    $stateProvider.state('user_dashboard', {
        url: '/users/:userId',
        templateUrl: 'js/user_dashboard/user_dashboard.html',
        controller: 'UserDashCtrl',
        resolve: {
            user: function(AuthService) {
                return AuthService.getLoggedInUser()
            },
            categories: function(CategoryFactory){
                return CategoryFactory.$loaded()
            },
            info: function(ChannelInfoFactory, user){
                return ChannelInfoFactory.getInfo(user.username).$loaded()
            },
            recent: function(RecentFactory, user){
                return RecentFactory.getRecent(user.username)
            },
            subscriptions: function(SubscriberFactory, user){
                return SubscriberFactory.getSubscriptions(user.username).$loaded()
            },
            subscribers: function(SubscriberFactory, user){
                return SubscriberFactory.getSubscribers(user.username)
                .$loaded(subs=> SubscriberFactory.getWeekly(subs))
            }
        }
    });

});