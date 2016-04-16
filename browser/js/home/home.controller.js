app.controller('HomeCtrl', function ($scope, loggedInUser, ActiveFactory, ChannelInfoFactory) {

    $scope.user = loggedInUser;
    $scope.$on('auth-logout-success', () => {
      $scope.user = false;
    })

    ActiveFactory.all().$loaded()
      .then(activeChannels => {
        var channels = [];
        var mostViews = 0;
        var topChannel;
        angular.forEach(activeChannels, channel => {
            ChannelInfoFactory.getInfo(channel.$id).$loaded(data => {
              data.preview = '/preview/' + data.user + '.jpg';
              console.log(mostViews, data.views);
              if(mostViews < data.views){
                mostViews = data.views;
                topChannel = data;
              }
              console.log('tp[', topChannel);
              channels.push(data)
          })
        })
        return [channels, topChannel];
      }).then((channelData) => {
        console.log('channel data', channelData);
        $scope.channels = channelData[0];
        $scope.topChannel = channelData[1];
          $scope.jwplayerSetup = {
            file: "rtmp://162.243.92.50/live/" + channelData[1].user,
            width: "100%",
            aspectratio: "16:9",
            image: channelData[1].preview
          };
      })
});
