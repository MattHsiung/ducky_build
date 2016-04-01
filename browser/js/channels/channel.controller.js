app.controller('ChannelCtrl', function (active,$scope, channelInfo, streamer, subscribers, isSubscribed, subscriptions, user, SubscriberFactory, RecentFactory) {
  
    $scope.streamer = streamer;
    $scope.loading = true;
    $scope.online = active;
    $scope.channelInfo = channelInfo;
    $scope.subscribed = isSubscribed;
    $scope.subscriptions = subscriptions;
    $scope.subscribers = subscribers;
    $scope.numOfSubscribers = Object.keys(subscribers).length - 3;
    $scope.user = user;

    RecentFactory.setRecent(user.username, streamer)

    $scope.subscribeToChannel = function(){
        if(user){
            SubscriberFactory.subscribeToChannel(user, streamer, subscriptions, subscribers)
            $scope.subscribed = !$scope.subscribed
        }
    }
    // ---------PLAYER
    $scope.jwplayerSetup = {
        file: "rtmp://162.243.92.50/live/" + streamer,
        width: "100%",
        aspectratio: "16:9",
        image: `/preview/${streamer}.jpg`
    };

});


