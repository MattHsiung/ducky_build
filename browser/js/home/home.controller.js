app.controller('HomeCtrl', function (user, topChannel, channels, $scope, ActiveFactory) {

    $scope.$on('auth-logout-success', () => {
      $scope.user = false;
    })
    $scope.user = user
    $scope.channels = channels
    $scope.topChannel = topChannel
    $scope.jwplayerSetup = {
      file: "rtmp://162.243.92.50/live/" + topChannel.user,
      width: "100%",
      aspectratio: "16:9",
      image: '/preview/'+ topChannel.user +'.jpg'
    };
});
