(function () {
    'use strict';

    angular.module('app.sales')
        .controller('SalesEditController', SalesEditController);

    function SalesEditController($scope, $state, $mdDialog, entity, AppUtilsService, SaleService, PaymentMethodService, FlagService, OperatorService, VoucherProductService) {
        $scope.sale = entity;
        $scope.paymentMethods = PaymentMethodService.query();
        $scope.voucherProducts = VoucherProductService.query();
        $scope.flags = FlagService.query();
        $scope.operators = OperatorService.query();
        $scope.saving = false;

        $scope.onChangePaymentMethod = onChangePaymentMethod;
        $scope.onChangeFlag = onChangeFlag;
        $scope.checkSale = checkSale;
        $scope.isVoucher = isVoucher;
        $scope.isParcelado = isParcelado;
        $scope.save = save;

        function onChangePaymentMethod(){
            $scope.sale.taxes_id = null;
            $scope.sale.tax.flags_id = null;
            $scope.sale.tax.operators_id = null;
            checkSale();
        }

        function onChangeFlag(){
            checkSale();
        }

        function checkSale(){
            $scope.sale.taxes_id = null;
            if($scope.sale && $scope.sale.tax.flags_id && $scope.sale.tax.additional && $scope.sale.tax.payment_methods_id){
                if(isVoucher()){
                    if($scope.sale.tax.additional.voucher_products_id) SaleService.check($scope.sale, checkSaleSuccess, checkSaleError);
                } else {
                    if($scope.sale.tax.additional.operators_id) SaleService.check($scope.sale, checkSaleSuccess, checkSaleError);
                }
            }
        }

        function isVoucher(){
            if($scope.sale && $scope.sale.tax){
                return $scope.paymentMethods.some(function(p){
                    return p.id == $scope.sale.tax.payment_methods_id && p.type === "VOUCHER"
                });
            }
            return false;
        }

        function isParcelado(){
            if($scope.sale && $scope.sale.tax) {
                return $scope.paymentMethods.some(function (p) {
                    return p.id == $scope.sale.tax.payment_methods_id && p.type === "PARCELADO"
                });
            }
        }

        function save(){
            $scope.saving = true;
            if($scope.sale){
                if($scope.sale.id){
                    SaleService.update($scope.sale, saveSuccess, saveError);
                } else {
                    SaleService.save($scope.sale, saveSuccess, saveError);
                }
            }
        }

        function saveSuccess(sale){
            AppUtilsService.showSuccessToast("Venda salva");
            $state.go('sales.list');
        }

        function saveError(data){
            AppUtilsService.showErrorToast("Ocorreu um erro ao salvar. Tente novamente mais tarde");
            $scope.saving = false;
        }

        function checkSaleSuccess(data){
            $scope.sale.taxes_id = data.id;
            $scope.sale.tax = data;
            if(!$scope.sale.tax.additional){
                $scope.sale.tax.additional = {
                    id: data.additional_id,
                    operators_id: data.operators_id,
                    voucher_products_id: data.voucher_products_id
                };
            }
            $scope.sale.parcels = 1;
        }

        function checkSaleError(response){
            $scope.sale.taxes_id = null;
            $scope.sale.tax = {additional: {}};
            $scope.sale.parcels = 1;

            var confirm = $mdDialog.confirm()
                .title('Sem configuração de taxa')
                .textContent(response.data.error)
                .ok('Criar uma Configuração de taxa')
                .cancel('Voltar e editar a Venda');

            $mdDialog.show(confirm).then(function() {
                $state.go('taxes.create');
            });
        }

    }

})();