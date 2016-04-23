app.factory('ChannelsFactory', function(FB, $firebaseArray){
  var ref = new Firebase(FB+'channel');
  return $firebaseArray(ref);
});
app.factory('ActiveFactory', function(FB, $q, $firebaseArray, $firebaseObject, ChannelInfoFactory){
  var ref = new Firebase(FB+'active');
  return {
      all: function(){
        return $firebaseArray(ref);
      },
      one: function(streamer){
        return $firebaseObject(ref.child(streamer));
      },
      allPopulated: function(){
        return this.all().$loaded(activeChannels => {
          var channels = [];
          angular.forEach(activeChannels, channel => {
            ChannelInfoFactory.getInfo(channel.$id).$loaded(info => {
                info.preview = '/preview/' + info.user + '.jpg';
                channels.push(info)
            })
          });
          return channels
        })
      }
  }
});

app.factory('ChannelInfoFactory', function(FB, $firebaseObject, $firebaseArray){
  var ref = new Firebase(FB+'channel');
  return {
      getInfo: function(user){
        return $firebaseObject(ref.child(user));
      },
      topChannel: function(){
        return $firebaseArray(ref.orderByChild('views').limitToLast(1));
      }
  }
});

app.factory('CategoryFactory', function(FB, $firebaseArray){
  var ref = new Firebase(FB+'categories');
  return $firebaseArray(ref);
});

app.factory('RecentFactory', function(FB, $firebaseObject){
  var ref = new Firebase(FB+'recent');
  return {
      setRecent: function(user, streamer){
        return $firebaseObject(ref.child(user))
          .$loaded(recent => {
            recent.$value = streamer
            recent.$save()
          });
      }
  }
});

app.factory('FilesFactory', function(FB, $firebaseObject){
  var ref = new Firebase(FB+'files')
  return {
      getFiles: function(streamer){
        return $firebaseObject(ref.child(streamer))
      }
  }
});

app.factory('SubscriberFactory', function(FB, $firebaseObject) {
  var refSubscribers = new Firebase(FB+'subscribers');
  var refSubscriptions = new Firebase(FB+'subscriptions');
  return {
    getSubscribers: function(streamer) {
      return $firebaseObject(refSubscribers.child(streamer));
    },
    getSubscriptions: function(user){
      return $firebaseObject(refSubscriptions.child(user));
    },
    subscribeToChannel: function(user, streamer, subscriptions, subscribers){
          subscriptions[streamer] =  subscriptions[streamer]? null:true;
          subscriptions.$save()
          subscribers[user.username]= subscribers[user.username] ? null:Firebase.ServerValue.TIMESTAMP;
          subscribers.$save()
    }
  }
});

app.controller('ChannelsCtrl', function (channels, categories, $scope, filterFilter, ActiveFactory, ChannelInfoFactory) {
    // $scope.loading = false;
    $scope.channels = channels;
    $scope.categories = categories;
    $scope.searchCat = "";
    $scope.search = {};
    $scope.selCategory = function(category){
      $scope.searchCat = category;
    }
});

