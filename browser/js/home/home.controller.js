app.controller('HomeCtrl', function ($scope) {

    //JW PLAYER SETUP
    jwplayer.key = 'UI/JLLVJo3qYTxLMSXu9hiyaEAY/jkFCLR+38A==';
    var playerInstance = jwplayer("hero-stream");
    playerInstance.setup({
        file: "rtmp://10.0.2.15/live/",
        width: "100%",
        aspectratio: "16:9"
      });

});