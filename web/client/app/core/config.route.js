(function () {
    'use strict';

    angular.module('app')
        .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider',
                function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

                $stateProvider
                    .state('dashboard', {
                        url: '/dashboard',
                        templateUrl: 'app/dashboard/dashboard.html',
                        controller: 'DashboardCtrl',
                        resolve: {
                            authorize: ['AuthService', function (AuthService) {
                                return AuthService.authorize();
                            }]
                        }
                    })
                    .state('login', {
                        url: '/login',
                        templateUrl: 'app/page/signin.html',
                        controller: 'authCtrl'
                    });

                $urlRouterProvider
                    .when('/', '/dashboard')
                    .otherwise('/dashboard');
            }
        ]);

})();
