app.controller('ChannelsCtrl', function ($window, $scope, $firebaseObject) {
    var ref = new Firebase('https://ducky.firebaseio.com/users/');

    var activeChannels = [];
    var firebaseRef = $firebaseObject(ref)
    $scope.col1=[]
    $scope.col2=[]
    $scope.col3=[]
    //load up all active channels
    firebaseRef.$loaded()
    .then(function(data){
      angular.forEach(firebaseRef, function(value, key) {
          activeChannels.push({username: key, files: value});
       });
      $scope.channels = activeChannels;
    });
    $scope.search={};

});

