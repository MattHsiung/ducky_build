app.controller('AccordionDemoCtrl', function ($scope, $firebaseObject) {
  $scope.oneAtATime = true;

  $scope.headers = {
    folder:'<span>folder</span>',
    file:'<span>file</span>'
  }

  var ref = new Firebase('https://ducky.firebaseio.com/users/ducky');
  
  $scope.directory = [{
    label: "Public",
    children: ["One","Two","Three"],
    classes: ["special", "blue"]
  }]
  
  var needed;

  $firebaseObject(ref).$loaded()
    .then(function(data){
      console.log(converter(data));
      $scope.directory = converter(data);
    });

  function converter(obj) {
    if (obj.content) {
      return;
    }
    else {
      var final = [];

      for (var key in obj) {
        if (obj.hasOwnProperty(key) && String(key).indexOf("$") === -1) {
          var content= obj[key].content || null
          final.push({
            label: key,
            children: converter(obj[key]),
            onSelect: function(branch){
                if(branch.data) editor.setValue(branch.data,1)
            },
            data:content
          })
        }
      }
      return final;
    }
  }

  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
});
