(function () {
    'use strict';

    angular.module('app.permissions', []).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider){
        $stateProvider.state('permissions', {
            abstract: true,
            template: '<ui-view/>',
            url: '/permissoes',
            resolve: {
                authorize: ['AuthService', function (AuthService) {
                    return AuthService.authorize();
                }]
            }
        })
        .state('permissions.list', {
            url: '/listar',
            templateUrl: 'app/pages/permissions/list.html',
            controller: 'PermissionsListController'
        })
        .state('permissions.create', getDetailState('/criar'))
        .state('permissions.edit', getDetailState('/editar/{id}'));
        $urlRouterProvider.when('/permissoes','/permissoes/listar');

        function getDetailState(url){
            return {
                url: url,
                templateUrl: 'app/pages/permissions/edit.html',
                controller: 'PermissionsEditController',
                resolve: {
                    entity: ['$stateParams', 'PermissionService', function ($stateParams, PermissionService) {
                        var permission = {
                            id: null,
                            name: null,
                            slug: null,
                            description: null
                        };
                        return ($stateParams.id) ? PermissionService.get({id: $stateParams.id}).$promise : permission;
                    }]
                }
            }
        }
    }
})(); 