(function () {
    'use strict';

    angular.module('app.interceptors')
        .factory('AuthInterceptor', ['$localStorage', '$rootScope', '$q', AuthInterceptor]);

    function AuthInterceptor($localStorage, $rootScope, $q) {
        return {
            'request': function (config) {
                config.headers = config.headers || {};
                if ($localStorage.authToken) {
                    config.headers.Authorization = 'Bearer ' + $localStorage.authToken;
                } else {
                    $rootScope.$emit("unauthorized");
                    //$injector.get('$state').go('login');
                    //$location.path('/#!/login');
                }
                return config;
            },
            'responseError': function (response) {
                if (response.status === 401 || response.status === 403 | response.status === 404) {
                    $rootScope.$emit("unauthorized");
                    //$injector.get('$state').go('login');
                    //$location.path('/#!/login');
                }
                return $q.reject(response);
            }
        };
    }
})();
