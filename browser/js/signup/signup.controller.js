app.controller('SignUpCtrl', function ($scope, AuthService, $state) {
    var ref = new Firebase('https://ducky.firebaseio.com/channel/');

    $scope.sendSignup = function (signupInfo) {

        $scope.error = null;

        AuthService.signup(signupInfo)
        .then((user) => {
          console.log('user', user);
          ref.child(user.username).set({category: 'No language yet', title: 'Just joined ducky', user: user.username, image: user.imageUrl , email: user.email, views: 0 })
        })
        .then(() => $state.go('start'))
        .catch(() => $scope.error = 'Invalid signup credentials.')
    };

});
