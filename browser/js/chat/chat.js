app.directive('chatDirective', function($rootScope, $firebaseArray, AuthService) {
    return {
        link : function(scope, element, attr) {

            var ducky = new Firebase('https://ducky.firebaseio.com/chat/' + scope.username);

            scope.show=false;
            $rootScope.chat=false;
            scope.toggle=function(){
              scope.show=!scope.show
              $rootScope.chat=!$rootScope.chat;
              if(scope.show)element.addClass('showChat');
              else element.removeClass('showChat');
            }
            AuthService.getLoggedInUser().then(user=>scope.user=user)

            scope.messages = $firebaseArray(ducky);
            scope.addMessage = function() {
              // $add on a synchronized array is like Array.push() except it saves to the database!
              scope.messages.$add({
                from: scope.user.username,
                content: scope.message,
                timestamp: Firebase.ServerValue.TIMESTAMP
              });

              scope.message = "";
            };

            scope.convertTimestamp =function(timestamp) {
              var date = new Date(timestamp);
              // Hours part from the timestamp
              var ampm=' am'
              var hours = date.getHours();
              if(hours >12){
                hours = hours-12
                ampm = 'pm'
              }else if(hours ===0){
                hours = 12
              }
              // Minutes part from the timestamp
              var minutes = "0" + date.getMinutes();
              // Seconds part from the timestamp
              var seconds = "0" + date.getSeconds();

              // Will display time in 10:30:23 format
              var formattedTime = hours + ':' + minutes.substr(-2) + ampm
              return formattedTime;
            }
        }
    };
});

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



