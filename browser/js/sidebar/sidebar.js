app.controller('SidebarController', function($scope, $rootScope) {
    $scope.state = false;
    $rootScope.sidebar=false;

     // var burst = new mojs.Burst({
     //        shape:    'circle',
     //        fill:     [ 'deeppink', 'cyan', 'orange' ],
     //        x: '50%', y: '50%'
     //    });

    $scope.duckyAnimate = function (){
      burst.start();
    }


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
