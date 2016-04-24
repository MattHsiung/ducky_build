app.directive('mainView', function() {
    return {
        restrict:'E',
        replace: true,
        scope:{},
        templateUrl: '/js/mainview/mainview.html',
        controller: function($scope, SidebarFactory){
    	    $scope.state = SidebarFactory;
        }
    };
});