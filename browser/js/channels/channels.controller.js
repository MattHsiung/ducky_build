app.controller('ChannelsCtrl', function ($window, $scope, $firebaseObject, $firebaseArray) {
    var ref = new Firebase('https://ducky.firebaseio.com/');

    $scope.channels = [];
    $scope.categories = [];
    var activeChannels = [];

    var catRef = $firebaseObject(ref.child('categories'));

    catRef.$loaded()
    .then(function(data){
      for(var key in data){
        if(key[0]!=="$"&& data.hasOwnProperty(key)) $scope.categories.push(key);
      }
    });

    var firebaseRef = $firebaseObject(ref.child('files'))
    //load up all active channels
    firebaseRef.$loaded()
    .then(function(data){
      angular.forEach(firebaseRef, function(value, key) {
          activeChannels.push({username: key, files: value});
       });
      $scope.activeChannels = activeChannels;
      getChannelInfo($scope.activeChannels);
    });

    $scope.search = {};

    $scope.selCategory = function(category){
      $scope.searchCat = category;
    }

    function getChannelInfo(liveChannels) {
      var liveRef = new Firebase('https://ducky.firebaseio.com/channel');
      liveChannels.forEach(function(channel){
        var query = liveRef.child(channel.username);
        $firebaseObject(query).$loaded()
        .then(function(data){
          var obj = {
            category: data.category,
            title: data.title,
            views: data.views,
            user: data.user,
            profilephoto: data.image + '?s=40',
            image: '/preview/' + data.user + '.jpg'
          }
          $scope.channels.push(obj);
        })
      });
    };
});

