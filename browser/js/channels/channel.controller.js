app.controller('ChannelCtrl', function ($scope, streamer, $firebaseObject, $firebaseArray, AuthService) {
  $scope.username = streamer;

    //Firebase DB Reference
  var ref = new Firebase('https://ducky.firebaseio.com');


var checkOnline = function (){
    $firebaseObject(ref.child('users'))
    .$loaded(function(data){
      if(!data[streamer]) $scope.online = false;
      else {
         //JW PLAYER SETUP
        jwplayer.key = 'UI/JLLVJo3qYTxLMSXu9hiyaEAY/jkFCLR+38A==';
        var playerInstance = jwplayer("streamer");
        playerInstance.setup({
            file: "rtmp://192.168.2.120/live/" +  streamer,
            width: "100%",
            aspectratio: "16:9",
            image: '/img/js_logo.jpg'
          });
        $scope.online = true;
      }
    })
  }
  checkOnline();


  //ACE EDITOR SETUP
  var editor = ace.edit('editor' );
  editor.setTheme("ace/theme/monokai");
  editor.getSession().setMode("ace/mode/javascript");
  editor.$blockScrolling = Infinity
  editor.setReadOnly(true);
  editor.setShowPrintMargin(false);


  $scope.directory = [{
    label: "Ducky",
    children: [{}]
  }]

  function load(){
    $firebaseObject(ref.child('users').child(streamer))
    .$loaded()
    .then(function(data){
      console.log('USER DATA', data);
      $scope.directory = converter(data);
      $scope.isSubscribed()
    });
  }



  var watch = $firebaseObject(ref.child('users').child(streamer)).$watch(function(data){load()})
  var watchChannel = $firebaseObject(ref.child('channel').child(streamer)).$watch(function(data){})
  var watchSubs = $firebaseObject(ref.child('subscribers').child(streamer)).$watch(function(data){})


  function converter(obj) {
    if (obj.content) {
      return;
    }
    else {
      var final = [];
      for (var key in obj) {
        if (obj.hasOwnProperty(key) && String(key).indexOf("$") === -1) {
          var content = obj[key].content || null
          if(obj[key].type){
            var type = key + '.'+ obj[key].type;
          }
          var selectMe=false;

          if(key + '.'+ obj[key].type === $scope.currentFile){
            editor.setValue(obj[key].content,1)
            selectMe = true;
          }
          // console.log('selectMe', selectMe, 'type', type);
          final.push({
            label: type||key,
            children: converter(obj[key]),
            onSelect: function(branch){
                if(branch.data) {
                  $scope.currentFile=branch.label;
                  editor.setValue(branch.data,1)
                }
            },
            data:content,
            selected:selectMe
          })
        }
      }
      return final;
    }
  }
  (function getChannelInfo(){
    $firebaseObject(ref.child('channel').child(streamer))
    .$loaded()
    .then(function(data){
      $scope.channelInfo = data;
      // console.log($scope.channelInfo)
    });
  })()

  function getSubs(){
    $scope.subs = $firebaseArray(ref.child('subscribers').child(streamer))

  }
  getSubs()

  AuthService.getLoggedInUser().then(user=>$scope.curUser = user)

  $scope.subscribeToChannel=function(){
    if($scope.curUser){
      var subscribe = $firebaseObject(ref.child('subscribers').child(streamer))
      .$loaded(function(data){
        data[$scope.curUser.username] = data[$scope.curUser.username] ? null:true;
        data.$save()
        console.log($scope.curUser.username+" subscribed to "+streamer)
        $scope.isSubscribed()


      })
      var subscript = $firebaseObject(ref.child('subscriptions').child($scope.curUser.username))
      .$loaded(function(data){
        console.log(data)
        data[streamer] = data[streamer]?null:true;
        data.$save()
        $scope.isSubscribed()

      })
    }else{
      console.log('subscribed failed')
    }
  }
  $scope.isSubscribed = function(){
    if($scope.curUser){
      $firebaseObject(ref.child('subscribers').child(streamer))
        .$loaded(function(data){
          if(data[$scope.curUser.username])$scope.subscribed=true
          else $scope.subscribed = false
          console.log($scope.subscribed)
        })

    }
  }
  $scope.subscribed;



});
