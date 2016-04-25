app.controller('SignUpCtrl', function ($scope, AuthService, $state, SignUpFactory) {
    $scope.sendSignup = function (signupInfo) {
        $scope.error = null;
        AuthService.signup(signupInfo)
            .then((user) => {
                SignUpFactory.signUp(user)
            })
            .then(() => $state.go('start'))
            .catch(() => $scope.error = 'Invalid signup credentials.')
    };

});

app.factory('SignUpFactory', ['FB', function (FB) {
    var ref = new Firebase(FB+'channel');
    return {
        signUp: function(user){
            ref.child(user.username).set({
                category: '', 
                title: 'Just joined Ducky', 
                user: user.username, 
                image: user.imageUrl , 
                email: user.email, 
                views: 0
            })
        }
    };
}])


app.directive('signUp', [function () {
    return {
        templateUrl: 'js/signup/signup.directive.html',
        replace: true,
        restrict: 'E',
        scope: true,
        controller: 'SignUpCtrl'
    };
}])