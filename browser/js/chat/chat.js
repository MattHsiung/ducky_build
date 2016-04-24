app.directive('chat', function() {
    return {
        restrict:'E',
        replace: true,
        scope:{
          streamer: '=',
          user: '=',
          expand: '='
        },
        templateUrl: '/js/chat/chat.html',
        controller: 'chatCtrl',
        link: function (scope, element) {
          scope.$watchCollection('messages', (update) => {
            if(update) $('.chatMessages').scrollTop($('.chatMessages')[0].scrollHeight);
          });
      },
    };
});

app.factory('ChatFactory', ['FB', '$firebaseArray', function (FB, $firebaseArray) {
  var ref = new Firebase(FB+'chat');
  return {
    getMessages: function(streamer) {
      return $firebaseArray(ref.child(streamer));
    }
  };
}])

app.controller('chatCtrl', function($scope, SidebarFactory, ChatFactory){
    //controlling view
    $scope.show = SidebarFactory;
    $scope.toggle=function(){
        SidebarFactory.chat = !SidebarFactory.chat
    }
    //fetch messages and add messages
    $scope.messages = ChatFactory.getMessages($scope.streamer)
    $scope.addMessage = function() {
      $scope.messages.$add({
        from: $scope.user,
        content: $scope.message,
        timestamp: Firebase.ServerValue.TIMESTAMP
      }).then(()=> $scope.message = "")
    };
})

//STATE FOR INDIVIDUAL STREAM PAGE
app.config( function ($stateProvider){
    $stateProvider.state('chat', {
        url: '/chat/:streamer',
        template: '<chat streamer="streamer" user="user.username" expand="true"></chat>',
        controller:function($scope, streamer, user){
          $scope.streamer = streamer
          $scope.user = user
        },
        resolve: {
            streamer: function ($stateParams){
              return $stateParams.streamer;
            },
            user: function(AuthService){
                return AuthService.getLoggedInUser().then(user => user)
            }
        }
    });
});

//Hit enter inside of text area to trigger 'submit'
app.directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter, {'event': event});
                });
                event.preventDefault();
            }
        });
    };
});
