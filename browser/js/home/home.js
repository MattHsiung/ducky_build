app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl',
        resolve: {
            loggedInUser: function (AuthService){
                return AuthService.getLoggedInUser()
                    .then( user => {
                        if(!user) return false;
                        else return user;
                    })
            }
        }
    });
});
