(function () {
    'use strict';

    angular.module('app.flags', []).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider){
        $stateProvider.state('flags', {
            abstract: true,
            template: '<ui-view/>',
            url: '/bandeiras',
            resolve: {
                authorize: ['AuthService', function (AuthService) {
                    return AuthService.authorize();
                }]
            }
        })
        .state('flags.list', {
            url: '/listar',
            templateUrl: 'app/pages/flags/list.html',
            controller: 'FlagsListController'
        })
        .state('flags.create', getDetailState('/criar'))
        .state('flags.edit', getDetailState('/editar/{id}'));
        $urlRouterProvider.when('/bandeiras','/bandeiras/listar');

        function getDetailState(url){
            return {
                url: url,
                templateUrl: 'app/pages/flags/edit.html',
                controller: 'FlagsEditController',
                resolve: {
                    entity: ['$stateParams', 'FlagService', function ($stateParams, FlagService) {
                        var flag = {
                            id: null,
                            name: null,
                            photo_url: null,
                            has_transaction_tax: false
                        };
                        return ($stateParams.id) ? FlagService.get({id: $stateParams.id}).$promise : flag;
                    }]
                }
            }
        }
    }
})(); 