app.controller('TypeaheadCtrl', function($scope, $firebaseObject, $firebaseArray) {
  var ref = new Firebase('https://ducky.firebaseio.com/');

  // $scope.selected = undefined;
  $scope.reset=function(){
    $scope.selected = "";
  }
});

