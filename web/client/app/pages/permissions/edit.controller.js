(function () {
    'use strict';

    angular.module('app.permissions')
        .controller('PermissionsEditController', PermissionsEditController);

    function PermissionsEditController($scope, $state, entity, AppUtilsService, PermissionService) {
        $scope.permission = entity;
        $scope.saving = false;

        $scope.save = save;

        function save(){
            $scope.saving = true;
            if($scope.permission){
                if($scope.permission.id){
                    PermissionService.update($scope.permission, saveSuccess, saveError);
                } else {
                    PermissionService.save($scope.permission, saveSuccess, saveError);
                }
            }
        }

        function saveSuccess(permission){
            AppUtilsService.showSuccessToast("Permissão " + permission.name + " salvo");
            $state.go('permissions.list');
        }

        function saveError(data){
            AppUtilsService.showErrorToast("Ocorreu um erro ao salvar. Tente novamente mais tarde");
            $scope.saving = false;
        }

    }

})();