(function () {
    'use strict';

    angular.module('app.operators')
        .controller('OperatorsListController', OperatorsListController);

    function OperatorsListController($scope, $state, AppUtilsService, RestService, OperatorService) {
        $scope.limitOptions = [5, 10, 15];
        
        $scope.query = {
            order: 'name',
            limit: 10,
            page: 1
        };
        $scope.can = {
            edit: $scope.$parent.$parent.hasPerm('UPDATE_OPERATORS'),
            delete: $scope.$parent.$parent.hasPerm('DELETE_OPERATORS')
        };

        $scope.pagination = RestService.getDefaultPagination();
        $scope.operators = RestService.getDefaultDataList();
        $scope.load = load;
        $scope.edit = edit;
        $scope.remove = remove;

        load();

        function load(){
            $scope.promise = OperatorService.query().$promise;
            $scope.promise.then(loadSuccess, loadError);
        }

        function edit(operator){
            $state.go('operators.edit', {id: operator.id});
        }

        function remove(operator){
            AppUtilsService.showDeleteDialog(function(){
                OperatorService.delete({id: operator.id}, function(){
                    AppUtilsService.showSuccessToast("Operadora " + operator.name + " deletada");
                    $scope.operators.data = $scope.operators.data.filter(function(u){ return u.id !== operator.id; });
                    $scope.operators.count = $scope.operators.data.length;
                });
            });
        }

        function loadSuccess(data){
            $scope.operators.data = data || [];
            $scope.operators.count = $scope.operators.data.length;
        }

        function loadError(data){
            console.log(data);
        }
    }

})(); 