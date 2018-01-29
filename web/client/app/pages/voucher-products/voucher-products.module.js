(function () {
    'use strict';

    angular.module('app.voucher_products', []).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider){
        $stateProvider.state('voucher-products', {
            abstract: true,
            template: '<ui-view/>',
            url: '/modalidades',
            resolve: {
                authorize: ['AuthService', function (AuthService) {
                    return AuthService.authorize();
                }]
            }
        })
        .state('voucher-products.list', {
            url: '/listar',
            templateUrl: 'app/pages/voucher-products/list.html',
            controller: 'VoucherProductsListController'
        })
        .state('voucher-products.create', getDetailState('/criar'))
        .state('voucher-products.edit', getDetailState('/editar/{id}'));
        $urlRouterProvider.when('/produtos-voucher','/produtos-voucher/listar');

        function getDetailState(url){
            return {
                url: url,
                templateUrl: 'app/pages/voucher-products/edit.html',
                controller: 'VoucherProductsEditController',
                resolve: {
                    entity: ['$stateParams', 'VoucherProductService', function ($stateParams, VoucherProductService) {
                        var voucherMethod = {
                            id: null,
                            name: null
                        };
                        return ($stateParams.id) ? VoucherProductService.get({id: $stateParams.id}).$promise : voucherMethod;
                    }]
                }
            }
        }
    }
})(); 