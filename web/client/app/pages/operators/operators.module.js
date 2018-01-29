(function () {
    'use strict';

    angular.module('app.operators', []).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider){
        $stateProvider.state('operators', {
            abstract: true,
            template: '<ui-view/>',
            url: '/operadoras',
            resolve: {
                authorize: ['AuthService', function (AuthService) {
                    return AuthService.authorize();
                }]
            }
        })
        .state('operators.list', {
            url: '/listar',
            templateUrl: 'app/pages/operators/list.html',
            controller: 'OperatorsListController'
        })
        .state('operators.create', getDetailState('/criar'))
        .state('operators.edit', getDetailState('/editar/{id}'));
        $urlRouterProvider.when('/operadoras','/operadoras/listar');

        function getDetailState(url){
            return {
                url: url,
                templateUrl: 'app/pages/operators/edit.html',
                controller: 'OperatorsEditController',
                resolve: {
                    entity: ['$stateParams', 'OperatorService', function ($stateParams, OperatorService) {
                        var operator = {
                            id: null,
                            name: null,
                            photo_url: null
                        };
                        return ($stateParams.id) ? OperatorService.get({id: $stateParams.id}).$promise : operator;
                    }]
                }
            }
        }
    }
})(); 