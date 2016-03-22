app.controller('SidebarController', function($scope, $rootScope) {

    $scope.state = false;
    $rootScope.sidebar=false;

    $scope.setActive = function(tab){
      $scope.activetab = tab;
    }

    $scope.toggleState = function() {
        $scope.state = !$scope.state;
        $rootScope.sidebar=!$rootScope.sidebar;
    };

});

app.directive('sidebarDirective', function() {
    return {
        link : function(scope, element, attr) {
            scope.$watch(attr.sidebarDirective, function(newVal) {
                  if(newVal)
                  {
                    element.addClass('show');
                    return;
                  }
                  element.removeClass('show');
            });
        }
    };
});
