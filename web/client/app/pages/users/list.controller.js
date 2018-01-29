(function () {
    'use strict';

    angular.module('app.users')
        .controller('UsersListController', UsersListController);

    function UsersListController($scope, $state, AppUtilsService, RestService, UserService) {
        $scope.limitOptions = [5, 10, 15];
        
        $scope.query = {
            order: 'name',
            limit: 10,
            page: 1
        };
        $scope.can = {
            edit: $scope.$parent.$parent.hasPerm('UPDATE_USERS'),
            delete: $scope.$parent.$parent.hasPerm('DELETE_USERS')
        };

        $scope.pagination = RestService.getDefaultPagination();
        $scope.users = RestService.getDefaultDataList();
        $scope.load = load;
        $scope.edit = edit;
        $scope.remove = remove;

        load();

        function load(){
            $scope.promise = UserService.query().$promise;
            $scope.promise.then(loadSuccess, loadError);
        }

        function edit(user){
            $state.go('users.edit', {id: user.id});
        }

        function remove(user){
            AppUtilsService.showDeleteDialog(function(){
                UserService.delete({id: user.id}, function(){
                    AppUtilsService.showSuccessToast("Usuário " + user.username + " deletado");
                    $scope.users.data = $scope.users.data.filter(function(u){ return u.id !== user.id; });
                    $scope.users.count = $scope.users.data.length;
                });
            });
        }

        function loadSuccess(data){
            $scope.users.data = data || [];
            $scope.users.count = $scope.users.data.length;
        }

        function loadError(data){
            console.log(data);
        }
    }

})(); 