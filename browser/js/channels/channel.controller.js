app.controller('ChannelCtrl', function (Editor,$scope, streamer, $firebaseObject, $firebaseArray, AuthService) {
  $scope.username = streamer;

  //ACE EDITOR SETUP
  
  var editor = Editor;
  editor.setTheme("ace/theme/monokai");
  editor.getSession().setMode("ace/mode/javascript");
  editor.$blockScrolling = Infinity
  editor.setReadOnly(true);
  editor.setShowPrintMargin(false);

  //JW PLAYER SETUP
  jwplayer.key = 'UI/JLLVJo3qYTxLMSXu9hiyaEAY/jkFCLR+38A==';
  var playerInstance = jwplayer("streamer");
  playerInstance.setup({
      file: "rtmp://192.168.68.8/live/" +  streamer,
      width: "100%",
      aspectratio: "16:9",
      image: '/preview/' + $scope.username + '.jpg'
    });
  //Firebase DB Reference
  var ref = new Firebase('https://ducky.firebaseio.com');

  $scope.directory = [{
    label: "Ducky",
    children: [{}]
  }]

  function load(){
    $firebaseObject(ref.child('users').child(streamer))
    .$loaded()
    .then(function(data){
      // console.log('loading');
      $scope.directory = converter(data);
      $scope.isSubscribed()
    });
  }

  var watch = $firebaseObject(ref.child('users').child(streamer))
    .$watch(function(data){load()})
  var watchChannel = $firebaseObject(ref.child('channel').child(streamer)).$watch(function(data){})
  var watchSubs = $firebaseObject(ref.child('subscribers').child(streamer)).$watch(function(data){})

  function checkForDots(key, type){
    var arr = key.split(",")
    if(arr.length>1){
      arr = arr.join('.')
    }else{
      arr = arr.join('')
    } 
    return arr + '.'+ type
  }

  function converter(obj) {
    if (obj.content) {
      console.log(obj)
      return;
    }
    else {
      console.log(obj)
      var final = [];
      for (var key in obj) {
        if (obj.hasOwnProperty(key) && String(key).indexOf("$") === -1) {
          var content = obj[key].content || null
          var selectMe=false;
          var type=null;
          //parse file name
          if(obj[key].type){
            type = checkForDots(key, obj[key].type);
          }
          //check for selected file upon refresh
          if(type === $scope.currentFile){
            editor.setValue(obj[key].content,1)
            selectMe = true;
          }
          //push file or folder to tree data
          final.push({
            label: type||key,
            children: converter(obj[key]),
            onSelect: function(branch){
                if(branch.data) {
                  $scope.currentFile=branch.label;
                  setEditorData(branch.data, branch.label.split('.'))
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

  function setEditorData(data, label){
    var type = label[label.length-1]
    var syntax={
      'js':'javascript',
      'html':'html',
      'css':'css',
      'json':'json',
      'php':'php',
      'txt':'text',
      'swift':'swift',
      'scss':'scss',
      'ruby':'ruby'
    }
    editor.getSession().setMode("ace/mode/"+syntax[type]);
    editor.setValue(data,1)
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

app.factory('Editor', [function () {
  

  return ace.edit('editor' );
}])
