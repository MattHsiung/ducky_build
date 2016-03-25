app.config(function ($stateProvider) {
    $stateProvider.state('start', {
        url: '/start',
        templateUrl: 'js/start/start.html',
        controller: 'StartCtrl'
    });
});

app.controller('StartCtrl', ['$scope', function ($scope) {
    
}])