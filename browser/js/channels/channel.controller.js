app.controller('ChannelCtrl', function ($scope, streamer, $firebaseObject) {
  $scope.username = streamer;

  //ACE EDITOR SETUP
  var editor = ace.edit('editor' );
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
      aspectratio: "16:9"
    });


  var ref = new Firebase('https://ducky.firebaseio.com/users/' + streamer);

  $scope.directory = [{
    label: "Ducky",
    children: [{}]
  }]

  function load(){
    $firebaseObject(ref).$loaded()
    .then(function(data){
      console.log('loading');
      $scope.directory = converter(data);
    });
  }

  var watch = $firebaseObject(ref).$watch(function(data){
    console.log('watching');
    load()
  })

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
          console.log('selectMe', selectMe, 'type', type);
          final.push({
            label: type||key,
            children: converter(obj[key]),
            onSelect: function(branch){
                if(branch.data) {
                  console.log(branch)
                  $scope.currentFile=branch.label;
                  console.log('$scopecurrentfile', $scope.currentFile);
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
  // load()

});