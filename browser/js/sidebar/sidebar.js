app.controller('SidebarController', function(SidebarFactory, SubscriberFactory, $scope, $state, AuthService) {
    $scope.open = SidebarFactory;
    
    $scope.$on('auth-login-success', ()=>{
      AuthService.getLoggedInUser().then(user => {
        $scope.user = user;
        SubscriberFactory.getSubscriptions(user.username)
        .$loaded(data => $scope.subscriptions = data)
      });
    })

    $scope.$on('auth-logout-success', () => {
      $scope.user = false;
      $scope.subscriptions=[];
      $state.go('home');
    });
    $scope.logout = function(){
      AuthService.logout()
    };

    $scope.setActive = function(tab){
      $scope.activetab = tab;
    };

    $scope.toggleState = function() {
        SidebarFactory.sidebar = !SidebarFactory.sidebar
    };
    

});
//sidebar-directive="state"
app.directive('sideBar', function() {
    return {
        restrict:'E',
        replace: true,
        scope:{},
        templateUrl: '/js/sidebar/sidebar.html',
        controller: 'SidebarController'
    };
});



