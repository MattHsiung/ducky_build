app.controller('HomeCtrl', function ($scope, loggedInUser) {

    $scope.user = loggedInUser;
    $scope.$on('auth-logout-success', () => {
      $scope.user = false;
    })

    $scope.jwplayerSetup = {
        file: "rtmp://192.168.68.8/live/jmeeker2",
        width: "100%",
        aspectratio: "16:9"
    };

});
