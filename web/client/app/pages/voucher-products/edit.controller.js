(function () {
    'use strict';

    angular.module('app.voucher_products')
        .controller('VoucherProductsEditController', VoucherProductsEditController);

    function VoucherProductsEditController($scope, $state, entity, AppUtilsService, VoucherProductService) {
        $scope.voucherProduct = entity;
        $scope.saving = false;

        $scope.save = save;

        function save(){
            $scope.saving = true;
            if($scope.voucherProduct){
                VoucherProductService[($scope.voucherProduct.id) ? 'update' : 'save']($scope.voucherProduct, saveSuccess, saveError);
            }
        }

        function saveSuccess(voucherProduct){
            AppUtilsService.showSuccessToast("Produto Voucher " + voucherProduct.name + " salvo");
            $state.go('voucher-products.list');
        }

        function saveError(data){
            AppUtilsService.showErrorToast("Ocorreu um erro ao salvar. Tente novamente mais tarde");
            $scope.saving = false;
        }

    }

})();