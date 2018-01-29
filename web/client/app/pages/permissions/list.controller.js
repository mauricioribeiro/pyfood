(function () {
    'use strict';

    angular.module('app.permissions')
        .controller('PermissionsListController', PermissionsListController);

    function PermissionsListController($scope, $state, AppUtilsService, RestService, PermissionService) {
        $scope.limitOptions = [5, 10, 15];
        
        $scope.query = {
            order: 'name',
            limit: 10,
            page: 1
        };
        $scope.can = {
            edit: $scope.$parent.$parent.hasPerm('UPDATE_PERMISSIONS'),
            delete: $scope.$parent.$parent.hasPerm('DELETE_PERMISSIONS')
        };

        $scope.pagination = RestService.getDefaultPagination();
        $scope.permissions = RestService.getDefaultDataList();
        $scope.load = load;
        $scope.edit = edit;
        $scope.remove = remove;

        load();

        function load(){
            $scope.promise = PermissionService.query().$promise;
            $scope.promise.then(loadSuccess, loadError);
        }

        function edit(permission){
            $state.go('permissions.edit', {id: permission.id});
        }

        function remove(permission){
            AppUtilsService.showDeleteDialog(function(){
                PermissionService.delete({id: permission.id}, function(){
                    AppUtilsService.showSuccessToast("Perfil " + permission.name + " deletado");
                    $scope.permissions.data = $scope.permissions.data.filter(function(p){ return p.id !== permission.id; });
                    $scope.permissions.count = $scope.permissions.data.length;
                });
            });
        }

        function loadSuccess(data){
            $scope.permissions.data = data || [];
            $scope.permissions.count = $scope.permissions.data.length;
        }

        function loadError(data){
            console.log(data);
        }
    }

})(); 