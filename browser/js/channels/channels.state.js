app.config( function ($stateProvider){
    $stateProvider.state('channels', {
        url: '/channels',
        templateUrl: '/js/channels/templates/channels.html',
        controller: 'ChannelsCtrl'
    }),
    $stateProvider.state('channel', {
        url: '/channels/:username',
        templateUrl: '/js/channels/templates/channel.html',
        controller: 'ChannelCtrl',
        resolve: {
            streamer: function ($stateParams){
              return $stateParams.username;
            }
        }
    });
});
