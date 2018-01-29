(function () {
    'use strict';

    angular.module('app.pointsOfSale', []).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider){
        $stateProvider.state('points-of-sale', {
            abstract: true,
            template: '<ui-view/>',
            url: '/pos',
            resolve: {
                authorize: ['AuthService', function (AuthService) {
                    return AuthService.authorize();
                }]
            }
        })
        .state('points-of-sale.list', {
            url: '/listar',
            templateUrl: 'app/pages/points-of-sale/list.html',
            controller: 'PointsOfSaleListController'
        })
        .state('points-of-sale.create', getDetailState('/criar'))
        .state('points-of-sale.edit', getDetailState('/editar/{id}'));
        $urlRouterProvider.when('/pos','/pos/listar');

        function getDetailState(url){
            return {
                url: url,
                templateUrl: 'app/pages/points-of-sale/edit.html',
                controller: 'PointsOfSaleEditController',
                resolve: {
                    entity: ['$stateParams', 'PointOfSaleService', function ($stateParams, PointOfSaleService) {
                        var pos = {
                            id: null,
                            photo_url: null,
                            type: null,
                            code: null,
                            operator_id: null,
                            value: null,
                            due_day: null,
                            due_month: null,
                            ec_pv: null,
                            active: true,
                            cancellation_protocol: null,
                            cancellation_date: null
                        };
                        return ($stateParams.id) ? PointOfSaleService.get({id: $stateParams.id}).$promise : pos;
                    }]
                }
            }
        }
    }
})(); 