app.controller('SidebarController', function($scope, $state, $rootScope, AuthService, $firebaseArray) {
    var ref = new Firebase('https://ducky.firebaseio.com/');
    $scope.state = false;
    $rootScope.sidebar=false;
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options){ 
        $rootScope.chat=false;
    })
    function checkUser (){
      AuthService.getLoggedInUser()
        .then(user => {
          if(!user) $scope.user = false;
          else{
            $scope.user = user;
            getSubs(user)
          }
        })
    }
    $scope.$on('auth-login-success', checkUser)
    $scope.$on('auth-logout-success', () => {
      $scope.user = false;
      $scope.subscriptions=[];
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
    function getSubs(user){
      // $scope.watchSubs = $firebaseArray(ref.child('subscriptions').child(user.username)).$watch(function(data){})
      if(user){
        var subRef = $firebaseArray(ref.child('subscriptions').child(user.username))
        subRef.$loaded(function(data){
          $scope.subscriptions=data;
        })
      }
    }
});

app.directive('sidebarDirective', function() {
    return {
        link : function(scope, element, attr) {
            scope.$watch(attr.sidebarDirective, function(newVal) {
                if(newVal){
                  element.addClass('show');
                  return;
                }
                element.removeClass('show');
            });
        }
    };
});

