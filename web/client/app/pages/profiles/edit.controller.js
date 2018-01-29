(function () {
    'use strict';

    angular.module('app.profiles')
        .controller('ProfilesEditController', ProfilesEditController);

    function ProfilesEditController($scope, $state, entity, AppUtilsService, ProfileService, PermissionService, UserService) {
        $scope.profile = entity;
        $scope.permissions = PermissionService.query();
        $scope.saving = false;

        $scope.save = save;

        function save(){
            $scope.saving = true;
            if($scope.profile){
                if($scope.profile.id){
                    ProfileService.update($scope.profile, saveSuccess, saveError);
                } else {
                    ProfileService.save($scope.profile, saveSuccess, saveError);
                }
            }
        }

        function saveSuccess(profile){
            UserService.getMyUser(function(response){
                $scope.$parent.$parent.myUser = response.data;
                AppUtilsService.showSuccessToast("Perfil " + profile.name + " salvo");
                $state.go('profiles.list');
            });
        }

        function saveError(data){
            AppUtilsService.showErrorToast("Ocorreu um erro ao salvar. Tente novamente mais tarde");
            $scope.saving = false;
        }

    }

})();