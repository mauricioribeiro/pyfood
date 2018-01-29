(function () {
    'use strict';

    angular.module('app.flags')
        .controller('FlagsListController', FlagsListController);

    function FlagsListController($scope, $state, AppUtilsService, RestService, FlagService) {
        $scope.limitOptions = [5, 10, 15];
        
        $scope.query = {
            order: 'name',
            limit: 10,
            page: 1
        };
        $scope.can = {
            edit: $scope.$parent.$parent.hasPerm('UPDATE_FLAGS'),
            delete: $scope.$parent.$parent.hasPerm('DELETE_FLAGS')
        };

        $scope.pagination = RestService.getDefaultPagination();
        $scope.flags = RestService.getDefaultDataList();
        $scope.load = load;
        $scope.edit = edit;
        $scope.remove = remove;

        load();

        function load(){
            $scope.promise = FlagService.query().$promise;
            $scope.promise.then(loadSuccess, loadError);
        }

        function edit(flag){
            $state.go('flags.edit', {id: flag.id});
        }

        function remove(flag){
            AppUtilsService.showDeleteDialog(function(){
                FlagService.delete({id: flag.id}, function(){
                    AppUtilsService.showSuccessToast("Bandeira " + flag.name + " deletada");
                    $scope.flags.data = $scope.flags.data.filter(function(u){ return u.id !== flag.id; });
                    $scope.flags.count = $scope.flags.data.length;
                });
            });
        }

        function loadSuccess(data){
            $scope.flags.data = data || [];
            $scope.flags.count = $scope.flags.data.length;
        }

        function loadError(data){
            console.log(data);
        }
    }

})(); 