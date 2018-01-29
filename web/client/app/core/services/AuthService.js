(function () {
    'use strict';

    angular.module('app.services')
        .service('AuthService', AuthService);

    function AuthService($http, $localStorage, $state, RestService, UserService) {

        this.login = function(username, password, authenticateSuccessCallback, authenticateFailCallback){
            return $http.post(RestService.getURI() + 'login/', {username:username, password:password}).then(authenticateSuccess, authenticateFail);

            function authenticateSuccess(response){
                var authToken = response.data.data.api_token;
                if (authToken && authToken.length) {
                    $localStorage.authToken = authToken;
                    if(typeof authenticateSuccessCallback === 'function'){
                        authenticateSuccessCallback(response);
                    }
                } else{
                    authenticateFail(response);
                }
            }

            function authenticateFail(response){
                if(typeof authenticateFailCallback === 'function'){
                    authenticateFailCallback(response);
                }
            }
        };

        this.authorize = function(){

            return UserService.getMyUser().$promise.then(getMyAccountThen);

            function getMyAccountThen(response){
                if(!response || !response.data || !response.data.id){
                    //$state.go('login', {accessdenied : true});
                } else {
                    // TODO add check permissions by state
                }
            }
        };

        this.logout = function(logoutCallback) {
            delete $localStorage.authToken;
            if(typeof logoutCallback === 'function'){
                logoutCallback();
            }
        }
    }

})(); 