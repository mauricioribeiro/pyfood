(function () {
    'use strict';

    angular.module('app.sales', []).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider){
        $stateProvider.state('sales', {
            abstract: true,
            template: '<ui-view/>',
            url: '/vendas',
            resolve: {
                authorize: ['AuthService', function (AuthService) {
                    return AuthService.authorize();
                }]
            }
        })
        .state('sales.list', {
            url: '/listar',
            templateUrl: 'app/pages/sales/list.html',
            controller: 'SalesListController'
        })
        .state('sales.create', getDetailState('/criar'))
        .state('sales.edit', getDetailState('/editar/{id}'));
        $urlRouterProvider.when('/vendas','/vendas/listar');

        function getDetailState(url){
            return {
                url: url,
                templateUrl: 'app/pages/sales/edit.html',
                controller: 'SalesEditController',
                resolve: {
                    entity: ['$stateParams', 'SaleService', function ($stateParams, SaleService) {
                        var sale = {
                            id: null,
                            sales_date: new Date(),
                            gross_value: null,
                            nsu: null,
                            taxes_id: null,
                            parcels: 1,
                            tax: {
                                additional: {}
                            }
                        };
                        return ($stateParams.id) ? SaleService.get({id: $stateParams.id}).$promise : sale;
                    }]
                }
            }
        }
    }
})(); 