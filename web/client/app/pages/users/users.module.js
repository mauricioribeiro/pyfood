(function () {
    'use strict';

    angular.module('app.users', []).config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider){
        $stateProvider.state('users', {
            abstract: true,
            template: '<ui-view/>',
            url: '/usuarios',
            resolve: {
                authorize: ['AuthService', function (AuthService) {
                    return AuthService.authorize();
                }]
            }
        })
        .state('users.list', {
            url: '/listar',
            templateUrl: 'app/pages/users/list.html',
            controller: 'UsersListController'
        })
        .state('users.create', getDetailState('/criar'))
        .state('users.edit', getDetailState('/editar/{id}'));
        $urlRouterProvider.when('/usuarios','/usuarios/listar');

        function getDetailState(url){
            return {
                url: url,
                templateUrl: 'app/pages/users/edit.html',
                controller: 'UsersEditController',
                resolve: {
                    entity: ['$stateParams', 'UserService', function ($stateParams, UserService) {
                        var owner = {
                            id: null,
                            name: null,
                            cpf: null,
                            cnpj: null
                        };

                        var user = {
                            id: null,
                            email: null,
                            profiles_id: null,
                            owner_id: null,
                            owner_type: null,
                            name: null,
                            profile: null,
                            owner: owner
                        };

                        user = ($stateParams.id) ? UserService.get({id: $stateParams.id}).$promise : user;
                        if(!user.owner){
                            user.owner = owner;
                        }
                        return user;
                    }]
                }
            }
        }
    }
})(); 