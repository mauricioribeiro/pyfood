(function () {
    'use strict';

    angular.module('app.voucher_products')
        .controller('VoucherProductsListController', VoucherProductsListController);

    function VoucherProductsListController($scope, $state, AppUtilsService, RestService, VoucherProductService) {
        $scope.limitOptions = [5, 10, 15];
        
        $scope.query = {
            order: 'name',
            limit: 10,
            page: 1
        };
        $scope.can = {
            edit: $scope.$parent.$parent.hasPerm('UPDATE_VOUCHER_PRODUCTS'),
            delete: $scope.$parent.$parent.hasPerm('DELETE_VOUCHER_PRODUCTS')
        };

        $scope.pagination = RestService.getDefaultPagination();
        $scope.voucherProducts = [];
        $scope.load = load;
        $scope.edit = edit;
        $scope.remove = remove;

        load();

        function load(){
            $scope.promise = VoucherProductService.query().$promise;
            $scope.promise.then(loadSuccess, loadError);
        }

        function edit(voucherProduct){
            $state.go('voucher-products.edit', {id: voucherProduct.id});
        }

        function remove(voucherProduct){
            AppUtilsService.showDeleteDialog(function(){
                VoucherProductService.delete({id: voucherProduct.id}, function(){
                    AppUtilsService.showSuccessToast("Produto Voucher " + voucherProduct.name + " deletada");
                    $scope.voucherProducts.data = $scope.voucherProducts.data.filter(function(v){ return v.id !== voucherProduct.id; });
                    $scope.voucherProducts.count = $scope.voucherProducts.data.length;
                });
            });
        }

        function loadSuccess(data){
            $scope.voucherProducts.data = data || [];
            $scope.voucherProducts.count = $scope.voucherProducts.data.length;
        }

        function loadError(data){
            console.log(data);
        }
    }

})(); 