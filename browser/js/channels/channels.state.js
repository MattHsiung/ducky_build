app.config( function ($stateProvider){
    $stateProvider.state('channels', {
        url: '/channels',
        templateUrl: '/js/channels/templates/channels.html',
        controller: 'ChannelsCtrl',
        resolve:{
            channels: function(ActiveFactory, FB, ChannelInfoFactory){
                return ActiveFactory.all().$loaded(activeChannels => {
                    var channels = [];
                    angular.forEach(activeChannels, channel => {
                        ChannelInfoFactory.getInfo(channel.$id).$loaded(data =>channels.push(data))
                    });
                    return channels
                })
            },
            categories: function(CategoryFactory){
                return CategoryFactory.$loaded();
            }
        }
    });
    $stateProvider.state('channel', {
        url: '/channels/:username',
        templateUrl: '/js/channels/templates/channel.html',
        controller: 'ChannelCtrl',
        resolve: {
            streamer: function ($stateParams){
              return $stateParams.username;
            },
            channelInfo: function(ChannelInfoFactory, streamer){
                return ChannelInfoFactory.getInfo(streamer).$loaded()
            },
            active: function(ActiveFactory, streamer){
                return ActiveFactory.one(streamer).$loaded(function(data){
                    if(data.$value)return true
                    return false
                })
            },
            user: function(AuthService) {
                return AuthService.getLoggedInUser().then(user => user);
            },
            subscribers: function(streamer, SubscriberFactory) {
                return SubscriberFactory.getSubscribers(streamer)
                .$loaded();
            },
            isSubscribed: function(subscribers, user) {
                if(!user)return false;
                if (subscribers[user.username]) return true;
                return false;
            },
            subscriptions: function(user, SubscriberFactory){
                if(!user) return null;
                return SubscriberFactory.getSubscriptions(user.username).$loaded()
            }

        }
    });
});
