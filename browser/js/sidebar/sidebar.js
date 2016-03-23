app.controller('SidebarController', function($scope, $state, $rootScope, AuthService) {

    $scope.state = false;
    $rootScope.sidebar=false;

    function checkUser (){
      AuthService.getLoggedInUser()
        .then(user => {
          console.log(user)
          if(!user) $scope.user = false;
          else $scope.user = user.username;
        })
    }

    $scope.$on('auth-login-success', checkUser)
    $scope.$on('auth-logout-success', () => {
      $scope.user = false;
    })

    $scope.logout = function(){
      AuthService.logout()
      .then(() => {
        $scope.user = false;
        $state.go('home');
      })
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
