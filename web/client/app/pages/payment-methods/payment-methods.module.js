(function () {
    'use strict';

    angular.module('app.payment_methods', []).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider){
        $stateProvider.state('payment-methods', {
            abstract: true,
            template: '<ui-view/>',
            url: '/modalidades',
            resolve: {
                authorize: ['AuthService', function (AuthService) {
                    return AuthService.authorize();
                }]
            }
        })
        .state('payment-methods.list', {
            url: '/listar',
            templateUrl: 'app/pages/payment-methods/list.html',
            controller: 'PaymentMethodsListController'
        })
        .state('payment-methods.create', getDetailState('/criar'))
        .state('payment-methods.edit', getDetailState('/editar/{id}'));
        $urlRouterProvider.when('/modalidades','/modalidades/listar');

        function getDetailState(url){
            return {
                url: url,
                templateUrl: 'app/pages/payment-methods/edit.html',
                controller: 'PaymentMethodsEditController',
                resolve: {
                    entity: ['$stateParams', 'PaymentMethodService', function ($stateParams, PaymentMethodService) {
                        var paymentMethod = {
                            id: null,
                            name: null,
                            uses_working_days: false,
                            default_deadline_days: 0
                        };
                        return ($stateParams.id) ? PaymentMethodService.get({id: $stateParams.id}).$promise : paymentMethod;
                    }]
                }
            }
        }
    }
})(); 