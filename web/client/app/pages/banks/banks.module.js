(function () {
    'use strict';

    angular.module('app.banks', []).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider){
        $stateProvider.state('banks', {
            abstract: true,
            template: '<ui-view/>',
            url: '/bancos',
            resolve: {
                authorize: ['AuthService', function (AuthService) {
                    return AuthService.authorize();
                }]
            }
        })
        .state('banks.list', {
            url: '/listar',
            templateUrl: 'app/pages/banks/list.html',
            controller: 'BanksListController'
        })
        .state('banks.create', getDetailState('/criar'))
        .state('banks.edit', getDetailState('/editar/{id}'));
        $urlRouterProvider.when('/bancos','/bancos/listar');

        function getDetailState(url){
            return {
                url: url,
                templateUrl: 'app/pages/banks/edit.html',
                controller: 'BanksEditController',
                resolve: {
                    entity: ['$stateParams', 'BankService', function ($stateParams, BankService) {
                        var bank = {
                            id: null,
                            number: null,
                            name: null,
                            photo_url: null
                        };
                        return ($stateParams.id) ? BankService.get({id: $stateParams.id}).$promise : bank;
                    }]
                }
            }
        }
    }
})(); 