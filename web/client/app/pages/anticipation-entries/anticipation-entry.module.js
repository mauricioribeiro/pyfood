(function () {
    'use strict';

    angular.module('app.anticipationEntries', []).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider){
        $stateProvider.state('anticipation-entries', {
            abstract: true,
            template: '<ui-view/>',
            url: '/lancamentos-antecipacao',
            resolve: {
                authorize: ['AuthService', function (AuthService) {
                    return AuthService.authorize();
                }]
            }
        })
        .state('anticipation-entries.list', {
            url: '/listar',
            templateUrl: 'app/pages/anticipation-entries/list.html',
            controller: 'AnticipationEntriesListController'
        })
        .state('anticipation-entries.create', getDetailState('/criar'))
        .state('anticipation-entries.edit', getDetailState('/editar/{id}'));
        $urlRouterProvider.when('/lancamentos-antecipacao','/lancamentos-antecipacao/listar');

        function getDetailState(url){
            return {
                url: url,
                templateUrl: 'app/pages/anticipation-entries/edit.html',
                controller: 'AnticipationEntriesEditController',
                resolve: {
                    entity: ['$stateParams', 'AnticipationEntryService', function ($stateParams, AnticipationEntryService) {
                        var anticipationEntry = {
                            id: null,
                            type: null,
                            source_type: null,
                            source_id: null,
                            date: null,
                            gross_value: null,
                            net_value: null,
                            tax_value: null,
                            voucher_period_start: null,
                            voucher_period_end: null,
                            voucher_protocol: null
                        };
                        return ($stateParams.id) ? AnticipationEntryService.get({id: $stateParams.id}).$promise : anticipationEntry;
                    }]
                }
            }
        }
    }
})(); 