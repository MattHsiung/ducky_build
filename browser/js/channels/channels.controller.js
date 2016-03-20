app.controller('ChannelsCtrl', function ($scope, $firebaseObject) {
    var ref = new Firebase('https://ducky.firebaseio.com/users/');

    var activeChannels = [];
    var firebaseRef = $firebaseObject(ref)
    firebaseRef.$loaded()
    .then(function(data){
      // console.log(converter(data));
      console.log('HERES FIREBASE DATA', data);
      console.log('recored', firebaseRef.$id);
      angular.forEach(firebaseRef, function(value, key) {
          activeChannels.push({username: key, files: value});
       });
    $scope.channels = activeChannels;
    });

});
