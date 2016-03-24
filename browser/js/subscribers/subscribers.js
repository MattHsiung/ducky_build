app.config(function ($stateProvider){
    $stateProvider.state('subscribers', {
        url: '/subscribers',
        templateUrl: '/js/subscribers/subscribers.html',
        controller: 'SubscribersCtrl'
    })
})

app.controller('SubscribersCtrl', ['$scope', '$firebaseArray', 'AuthService', function ($scope, $firebaseArray, AuthService) {
    var ref = new Firebase('https://ducky.firebaseio.com/subscribers');

    AuthService.getLoggedInUser().then(user=>{
        $scope.subscriptions = $firebaseArray(ref.child(user.username))
    })



}])