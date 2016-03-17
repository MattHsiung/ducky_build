app.controller('AccordionDemoCtrl', function ($scope, $firebaseObject ) {
  $scope.oneAtATime = true;

  $scope.headers = {
    folder:'<span>folder</span>',
    file:'<span>file</span>'
  }
  var ref = new Firebase('https://ducky.firebaseio.com/users/ducky')

  $scope.directory = $firebaseObject(ref)

  // ref.on("value", function(snapshot){
  //   console.log(snapshot.val())

  //   $scope.apply(function(){
  //     $scope.directory = snapshot.val()
      
  //   })

  //   console.log('Scope', $scope.directory)
  // }, function (errorObject) {
  //   console.log("The read failed: " + errorObject.code);
  // });


  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
});
