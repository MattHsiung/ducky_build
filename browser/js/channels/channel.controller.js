app.controller('ChannelCtrl', function ($scope, EditorFactory, StreamerFactory, streamer, $firebaseObject, $firebaseArray, AuthService) {
  var ref = new Firebase('https://ducky.firebaseio.com');
  $scope.username = streamer;
  $scope.loading = true;

  $scope.jwplayerSetup = {
      file: `rtmp://192.168.68.8/live/${streamer}`,
      width: "100%",
      aspectratio: "16:9",
      image: `/preview/${streamer}.jpg`
  };

  StreamerFactory.checkOnline(streamer)
    .then(isOnline => $scope.isOnline = isOnline)
    .catch(null, console.error.bind(console));

  // ACE EDITOR SETUP

  var editor = EditorFactory;
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
      $scope.loading = false;
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

  StreamerFactory.getChannelInfo(streamer)
    .then(data => $scope.channelInfo = data)
    .catch(null, console.error.bind(console));

  $scope.subs = StreamerFactory.getSubs(streamer);

  AuthService.getLoggedInUser().then(user => $scope.curUser = user)

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
});
