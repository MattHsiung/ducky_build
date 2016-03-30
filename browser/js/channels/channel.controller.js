app.controller('ChannelCtrl', function ($scope, Editor, StreamerFactory, streamer, $firebaseObject, $firebaseArray, AuthService) {
  var ref = new Firebase('https://ducky.firebaseio.com');
  $scope.username = streamer;
  $scope.loading = false;

  $scope.jwplayerSetup = {
      file: "rtmp://162.243.92.50/live/" + streamer,
      width: "100%",
      aspectratio: "16:9",
      image: `/preview/${streamer}.jpg`
  };

  StreamerFactory.checkOnline(streamer)
    .then(isOnline => $scope.isOnline = isOnline)
    .catch(null, console.error.bind(console));

  //ACE EDITOR SETUP
  var editor = Editor.editor();
  editor.setTheme("ace/theme/monokai");
  editor.getSession().setMode("ace/mode/javascript");
  editor.$blockScrolling = Infinity;
  editor.setReadOnly(true);
  editor.setShowPrintMargin(false);

  $scope.directory = [{
    label: "Ducky",
    children: [{}]
  }]

  function load(){
    $firebaseObject(ref.child('files').child(streamer))
    .$loaded()
    .then(function(data){
      console.log('data is here');
      $scope.directory = converter(data);
      $scope.isSubscribed()
    });
  }

  var watch = $firebaseObject(ref.child('files').child(streamer))
    .$watch(function(data){load()});

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
    //need to check for empty content or infinite recursion getting objects like {content: "", type: 'js'}
    if (obj.content || obj.content === "") {
      return;
    }
    else {
      console.log('checking files');
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
                  Editor.setEditorData(editor, branch.data, branch.label.split('.'))
                }
            },
            data:content,
            selected:selectMe
          })
        }
      }
      $scope.loading = false;
      return final;
    }
  }


  // StreamerFactory.getChannelInfo(streamer)
  //   .then(data => $scope.channelInfo = data)
  //   .catch(null, console.error.bind(console));

  $scope.channelInfo = StreamerFactory.info(streamer)

  $scope.subs = StreamerFactory.getSubs(streamer);

  AuthService.getLoggedInUser().then(user => $scope.curUser = user)

// <<<<<<< HEAD
//   AuthService.getLoggedInUser().then(user=> $scope.curUser = user)
//   .then(function(user){
//      ref.child('recent').child(user.username).set(streamer);
//   })

//   $scope.subscribeToChannel=function(){
//     if($scope.curUser){
//       var subscribe = $firebaseObject(ref.child('subscribers').child(streamer))
//       .$loaded(function(data){
//         data[$scope.curUser.username] = data[$scope.curUser.username] ? null:Firebase.ServerValue.TIMESTAMP;
//         data.$save()
//         console.log($scope.curUser.username+" subscribed to "+streamer)
//         $scope.isSubscribed()


//       })
//       var subscript = $firebaseObject(ref.child('subscriptions').child($scope.curUser.username))
//       .$loaded(function(data){
//         console.log(data)
//         data[streamer] = data[streamer]?null:true;
//         data.$save()
//         $scope.isSubscribed()

//       })
//     }else{
//       console.log('subscribed failed')
//     }
//   }

//   $scope.isSubscribed = function(){
//     if($scope.curUser){
//       $firebaseObject(ref.child('subscribers').child(streamer))
//         .$loaded(function(data){
//           if(data[$scope.curUser.username])$scope.subscribed=true
//           else $scope.subscribed = false
//         })
// =======
  $scope.subscribeToChannel = () => {
    StreamerFactory.subscribeToChannel($scope.curUser, streamer)
      .then(subscribed => $scope.subscribed = subscribed)
      .catch(null, console.error.bind(console));
  };

  $scope.isSubscribed = () => {
    if ($scope.curUser) {
      StreamerFactory.isSubscribed($scope.curUser, streamer)
        .then(subscribed => $scope.subscribed = subscribed)
        .catch(null, console.error.bind(console));
    }
  }
// <<<<<<< HEAD
  // $scope.subscribed;

  //--------TEXT-EDITOR CONTROLS---------
  $scope.expanded = false;
  $scope.expandWindow = function(){
    $scope.expanded = !$scope.expanded;
  }





});

//
// =======
