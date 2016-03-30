app.controller('HomeCtrl', function ($scope, loggedInUser) {

    $scope.user = loggedInUser;
    $scope.$on('auth-logout-success', () => {
      $scope.user = false;
    })

    $scope.jwplayerSetup = {
        file: "rtmp://162.243.92.50/live/Matt",
        width: "100%",
        aspectratio: "16:9",
        image: "/preview/Matt.jpg"
    };

});
