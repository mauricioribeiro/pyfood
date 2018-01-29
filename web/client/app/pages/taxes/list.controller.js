(function () {
    'use strict';

    angular.module('app.taxes')
        .controller('TaxesListController', TaxesListController);

    function TaxesListController($scope, $state, AppUtilsService, RestService, TaxService) {
        $scope.limitOptions = [25, 50, 100];
        
        $scope.query = {
            order: '-id',
            limit: 10,
            page: 1
        };
        $scope.can = {
            edit: $scope.$parent.$parent.hasPerm('UPDATE_TAXES'),
            delete: $scope.$parent.$parent.hasPerm('DELETE_TAXES'),
            all: $scope.$parent.$parent.hasPerm('READ_ALL_TAXES')
        };

        $scope.pagination = RestService.getDefaultPagination();
        $scope.taxes = RestService.getDefaultDataList();
        $scope.load = load;
        $scope.edit = edit;
        $scope.remove = remove;

        load();

        function load(){
            $scope.promise = TaxService[($scope.can.all) ? 'query' : 'getMyTaxes']().$promise;
            $scope.promise.then(loadSuccess, loadError);
        }

        function edit(tax){
            $state.go('taxes.edit', {id: tax.id});
        }

        function remove(tax){
            AppUtilsService.showDeleteDialog(function(){
                TaxService.delete({id: tax.id}, function(){
                    AppUtilsService.showSuccessToast("Taxa deletada");
                    $scope.taxes.data = $scope.taxes.data.filter(function(u){ return u.id !== tax.id; });
                    $scope.taxes.count = $scope.taxes.data.length;
                });
            });
        }

        function loadSuccess(data){
            $scope.taxes.data = data || [];
            $scope.taxes.count = $scope.taxes.data.length;
        }

        function loadError(data){
            console.log(data);
        }
    }

})(); 