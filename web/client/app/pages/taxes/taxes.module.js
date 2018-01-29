(function () {
    'use strict';

    angular.module('app.taxes', []).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider){
        $stateProvider.state('taxes', {
            abstract: true,
            template: '<ui-view/>',
            url: '/taxas',
            resolve: {
                authorize: ['AuthService', function (AuthService) {
                    return AuthService.authorize();
                }]
            }
        })
        .state('taxes.list', {
            url: '/listar',
            templateUrl: 'app/pages/taxes/list.html',
            controller: 'TaxesListController'
        })
        .state('taxes.create', getDetailState('/criar'))
        .state('taxes.edit', getDetailState('/editar/{id}'));
        $urlRouterProvider.when('/taxas','/taxas/listar');

        function getDetailState(url){
            return {
                url: url,
                templateUrl: 'app/pages/taxes/edit.html',
                controller: 'TaxesEditController',
                resolve: {
                    entity: ['$stateParams', 'TaxService', function ($stateParams, TaxService) {
                        var tax = {
                            id: null,
                            tax_percentage: null,
                            payment_deadline_days: null,
                            payment_methods_id: null,
                            flags_id: null,
                            additional_id: null,
                            additional_type: null,
                            additional: {
                                operators_id: null,
                                parcels: 12,
                                doc_value: null,
                                tariff_value: null,
                                cutoff_weekday: null,
                                repayment_days: null,
                                admission_value: null,
                                annuity_value: null
                            }
                        };
                        return ($stateParams.id) ? TaxService.get({id: $stateParams.id}).$promise : tax;
                    }]
                }
            };
        }
    }
})(); 