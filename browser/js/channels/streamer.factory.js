app.factory('StreamerFactory', ($firebaseObject, $firebaseArray) => {
  var ref = new Firebase('https://ducky.firebaseio.com');

  return {
    checkOnline: (streamer) => {
    	return $firebaseObject(ref.child('files'))
	    	.$loaded()
	    	.then(data => {
	    		if (!data[streamer]) return false;
	    		return true;
	    	})
    },
    isSubscribed: (currentUser, streamer) => {
  	  return $firebaseObject(ref.child('subscribers').child(streamer))
  	    .$loaded()
  	    .then(data => {
  	    	if (data[currentUser.username]) return true;
  	    	else return false;
  	    })
    },
    subscribeToChannel: (currentUser, streamer) => {
    	var isSubscribed;
    	return $firebaseObject(ref.child('subscribers').child(streamer))
    		.$loaded()
    		.then(data => {
    			data[currentUser.username] = data[currentUser.username] ? null : true;
    			isSubscribed = data[currentUser.username];
    			data.$save();
    			return $firebaseObject(ref.child('subscriptions').child(currentUser.username))
    				.$loaded();
    		})
    		.then(data => {
    			data[streamer] = data[streamer] ? null : true;
    			data.$save();
    			return isSubscribed;
    		})
    },
    getSubs: (streamer) => $firebaseArray(ref.child('subscribers').child(streamer)),
    // getChannelInfo: (streamer) => {
    // 	return $firebaseObject(ref.child('channel').child(streamer))
    // 		.$loaded(function (data) {
    //       console.log('this is the data', data);
    //     })
    // }
    info: function (streamer){
      console.log('getting info');
      return $firebaseObject(ref.child('channel').child(streamer))
    }
  }
});
