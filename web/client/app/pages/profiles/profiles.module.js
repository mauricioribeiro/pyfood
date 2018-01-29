(function () {
    'use strict';

    angular.module('app.profiles', []).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider){
        $stateProvider.state('profiles', {
            abstract: true,
            template: '<ui-view/>',
            url: '/perfis',
            resolve: {
                authorize: ['AuthService', function (AuthService) {
                    return AuthService.authorize();
                }]
            }
        })
        .state('profiles.list', {
            url: '/listar',
            templateUrl: 'app/pages/profiles/list.html',
            controller: 'ProfilesListController'
        })
        .state('profiles.create', getDetailState('/criar'))
        .state('profiles.edit', getDetailState('/editar/{id}'));
        $urlRouterProvider.when('/perfis','/perfis/listar');

        function getDetailState(url){
            return {
                url: url,
                templateUrl: 'app/pages/profiles/edit.html',
                controller: 'ProfilesEditController',
                resolve: {
                    entity: ['$stateParams', 'ProfileService', function ($stateParams, ProfileService) {
                        var profile = {
                            id: null,
                            name: null,
                            permissions: []
                        };
                        return ($stateParams.id) ? ProfileService.get({id: $stateParams.id}).$promise : profile;
                    }]
                }
            }
        }
    }
})(); 