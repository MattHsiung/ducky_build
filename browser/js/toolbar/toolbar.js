app.controller('ToolbarCtrl', function (Editor, $scope, $log) {
  var editor = Editor.editor();
  $scope.themes = {
    monokai:'monokai',
    chaos:'chaos',
    cloudsMidnight:'clouds_midnight',
    terminal:'terminal',
    vibrantInk:'vibrant_ink',
    dreamweaver:'dreamweaver',
    solar:'solarized_light',
    kuroir:'kuroir',
    xcode:'xcode'
  };

  $scope.setTheme=function(theme){
      console.log(theme)
      editor.setTheme("ace/theme/"+theme);
  }

});