(function () {
    'use strict';

    angular.module('app.profiles')
        .controller('ProfilesListController', ProfilesListController);

    function ProfilesListController($scope, $state, AppUtilsService, RestService, ProfileService) {
        $scope.limitOptions = [5, 10, 15];
        
        $scope.query = {
            order: 'name',
            limit: 10,
            page: 1
        };
        $scope.can = {
            edit: $scope.$parent.$parent.hasPerm('UPDATE_PROFILES'),
            delete: $scope.$parent.$parent.hasPerm('DELETE_PROFILES')
        };

        $scope.pagination = RestService.getDefaultPagination();
        $scope.profiles = RestService.getDefaultDataList();
        $scope.load = load;
        $scope.edit = edit;
        $scope.remove = remove;

        load();

        function load(){
            $scope.promise = ProfileService.query().$promise;
            $scope.promise.then(loadSuccess, loadError);
        }

        function edit(profile){
            $state.go('profiles.edit', {id: profile.id});
        }

        function remove(profile){
            AppUtilsService.showDeleteDialog(function(){
                ProfileService.delete({id: profile.id}, function(){
                    AppUtilsService.showSuccessToast("Perfil " + profile.name + " deletado");
                    $scope.profiles.data = $scope.profiles.data.filter(function(u){ return u.id !== profile.id; });
                    $scope.profiles.count = $scope.profiles.data.length;
                });
            });
        }

        function loadSuccess(data){
            $scope.profiles.data = data || [];
            $scope.profiles.count = $scope.profiles.data.length;
        }

        function loadError(data){
            console.log(data);
        }
    }

})(); 