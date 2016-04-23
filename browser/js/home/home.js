app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl',
        resolve: {
            user: function(AuthService) {
                return AuthService.getLoggedInUser().then(user => user);
            },
            channels: function(ActiveFactory){
                return ActiveFactory.allPopulated()
            },
            topChannel: function(ChannelInfoFactory){
                return ChannelInfoFactory.topChannel()
                    .$loaded( data => data[0] )
            }
        }
    });
});
