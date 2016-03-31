app.controller('ChannelCtrl', function (active, Editor,$scope, channelInfo, streamer, subscribers, isSubscribed, subscriptions, user, SubscriberFactory, FilesFactory) {
  
  $scope.loading = true;
  $scope.online = active;
  $scope.channelInfo = channelInfo;
  $scope.subscribed = isSubscribed;
  $scope.subscriptions = subscriptions;
  $scope.subscribers = subscribers;
  $scope.numOfSubscribers = Object.keys(subscribers).length - 3;
  $scope.user = user;

  $scope.subscribeToChannel = function(){
    if(user){
        SubscriberFactory.subscribeToChannel(user, streamer, subscriptions, subscribers)
        $scope.subscribed = !$scope.subscribed
    }
  }

  $scope.directory = [{
    label: "Ducky",
    children: [{}]
  }]
 
  FilesFactory.getFiles(streamer).then(function(files){
    $scope.directory = converter(files);
  })

  // var watch = $firebaseObject(ref.child('files').child(streamer))
  //   .$watch(function(data){load()})


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
    console.log(obj)
    if (!obj.content) {
      var final = [];
      angular.forEach(obj, function(value, key) {
        if (obj.hasOwnProperty(key)) {
          var selectMe=false;
          var type=null;
          //parse file name
          if(obj[key].type){
            type = checkForDots(key, obj[key].type);
          }
          //check for selected file upon refresh
          if(type === $scope.currentFile) {
            editor.setValue(obj[key].content,1)
            selectMe = true;
          }

          var toPush = {
            label: type||key,
            onSelect: function(branch) {
                if(branch.data) {
                  $scope.currentFile=branch.label;
                  setEditorData(branch.data, branch.label.split('.'))
                }
            },
            data: obj[key].content || null,
            selected: selectMe
          }
          toPush.children = type ? null : converter(obj[key]);
          final.push(toPush);
        }
      })
      $scope.loading = false;
      return final;
    }
  }

  // AuthService.getLoggedInUser().then(user=> $scope.curUser = user)
  // .then(function(user){
  //    ref.child('recent').child(user.username).set(streamer);
  // })

  


  //--------TEXT-EDITOR CONTROLS---------


  $scope.expanded = false;
  $scope.expandWindow = function() {
    $scope.expanded = !$scope.expanded;
  }

  var editor = Editor.editor();
  editor.setTheme("ace/theme/monokai");
  editor.getSession().setMode("ace/mode/javascript");
  editor.$blockScrolling = Infinity
  editor.setReadOnly(true);
  editor.setShowPrintMargin(false);

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
      'ruby':'ruby',
      'md':'markdown'
    }
    editor.getSession().setMode("ace/mode/"+syntax[type]);
    editor.setValue(data,1)
  }


  // ---------PLAYER
  $scope.jwplayerSetup = {
      file: "rtmp://162.243.92.50/live/" + streamer,
      width: "100%",
      aspectratio: "16:9",
      image: `/preview/${streamer}.jpg`
  };

});

app.service('Editor', [function () {
  this.editor = function(){
    return ace.edit('editor');
  } 
}])
