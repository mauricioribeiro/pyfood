(function () {
    'use strict';

    angular.module('app.banks')
        .controller('BanksListController', BanksListController);

    function BanksListController($scope, $state, AppUtilsService, RestService, BankService) {
        $scope.limitOptions = [5, 10, 15];
        
        $scope.query = {
            order: 'name',
            limit: 10,
            page: 1
        };
        $scope.can = {
            edit: $scope.$parent.$parent.hasPerm('UPDATE_BANKS'),
            delete: $scope.$parent.$parent.hasPerm('DELETE_BANKS')
        };

        $scope.pagination = RestService.getDefaultPagination();
        $scope.banks = RestService.getDefaultDataList();
        $scope.load = load;
        $scope.edit = edit;
        $scope.remove = remove;

        load();

        function load(){
            $scope.promise = BankService.query().$promise;
            $scope.promise.then(loadSuccess, loadError);
        }

        function edit(bank){
            $state.go('banks.edit', {id: bank.id});
        }

        function remove(bank){
            AppUtilsService.showDeleteDialog(function(){
                BankService.delete({id: bank.id}, function(){
                    AppUtilsService.showSuccessToast("Banco " + bank.name + " deletado");
                    $scope.banks.data = $scope.banks.data.filter(function(u){ return u.id !== bank.id; });
                    $scope.banks.count = $scope.banks.data.length;
                });
            });
        }

        function loadSuccess(data){
            $scope.banks.data = data || [];
            $scope.banks.count = $scope.banks.data.length;
        }

        function loadError(data){
            console.log(data);
        }
    }

})(); 