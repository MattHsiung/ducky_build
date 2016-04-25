app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: function($scope){
            $scope.state=true
            $scope.toggle=(state)=> $scope.state=state;
        }
    });

});
app.directive('login', [function () {
    return {
        templateUrl: 'js/login/login.directive.html',
        replace: true,
        restrict: 'E',
        scope: true,
        controller: 'LoginCtrl'
    };
}])

app.controller('LoginCtrl', function ($scope, AuthService, $state) {
    $scope.login = {};
    $scope.error = null;
    $scope.sendLogin = function (loginInfo) {
        $scope.error = null;
        AuthService.login(loginInfo)
            .then(()=> $state.go('home'))
            .catch(()=> $scope.error = 'Invalid login credentials.');
    };
});

