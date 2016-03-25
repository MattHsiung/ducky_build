'use strict';
app.directive('player', () => {
  return {
    restrict: 'E',
    scope: {
      'setup': '='
    },
    template: '<div id="streamer"></div>',
    link: (scope, element, attributes) => {
      jwplayer.key = 'UI/JLLVJo3qYTxLMSXu9hiyaEAY/jkFCLR+38A==';
      jwplayer('streamer').setup(scope.setup);
    }
  }
});