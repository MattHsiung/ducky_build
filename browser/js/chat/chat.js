app.controller('chatController', function($scope, $rootScope) {
    
    $scope.state = false;
    $rootScope.chat=false;
    
    $scope.toggleState = function() {
        $scope.state = !$scope.state;
        $rootScope.chat=!$rootScope.chat;
    };
    
});

app.directive('chatDirective', function() {
    return {
        link : function(scope, element, attr) {
            scope.$watch(attr.chatDirective, function(newVal) {
                  if(newVal)
                  {
                    element.addClass('showChat'); 
                    return;
                  }
                  element.removeClass('showChat');
            });
        }
    };
});