app.controller('ChannelsCtrl', function ($scope, $firebaseObject) {
    var ref = new Firebase('https://ducky.firebaseio.com/users/');

    var activeChannels = [];
    var firebaseRef = $firebaseObject(ref)

    //load up all active channels
    firebaseRef.$loaded()
    .then(function(data){
      angular.forEach(firebaseRef, function(value, key) {
          activeChannels.push({username: key, files: value});
       });
    $scope.channels = activeChannels;
    });

});
