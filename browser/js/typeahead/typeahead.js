app.controller('TypeaheadCtrl', function($scope, $firebaseObject, $firebaseArray) {
  var ref = new Firebase('https://ducky.firebaseio.com/');

  var _selected;

  $scope.selected = undefined;

  // $scope.ngModelOptionsSelected = function(value) {
  //   if (arguments.length) {
  //     _selected = value;
  //   } else {
  //     return _selected;
  //   }
  // };

  $scope.reset=function(){
    $scope.selected = undefined;
  }

  // $scope.modelOptions = {
  //   debounce: {
  //     default: 500,
  //     blur: 250
  //   },
  //   getterSetter: true
  // };

});

