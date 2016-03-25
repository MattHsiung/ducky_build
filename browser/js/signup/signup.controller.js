app.controller('SignUpCtrl', function ($scope, AuthService, $state) {

    $scope.sendSignup = function (signupInfo) {

        $scope.error = null;

        AuthService.signup(signupInfo)
        .then( () =>  $state.go('start'))
        .catch( () => $scope.error = 'Invalid signup credentials.')
    };

});
