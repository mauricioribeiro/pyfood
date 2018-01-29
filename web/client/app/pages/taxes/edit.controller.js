(function () {
    'use strict';

    angular.module('app.taxes')
        .controller('TaxesEditController', TaxesEditController);

    function TaxesEditController($scope, $state, $q, $mdDialog, entity, AppUtilsService, TaxService, PaymentMethodService, OperatorService, FlagService, VoucherProductService, UserService) {
        $scope.tax = entity;
        $scope.operators = [];
        $scope.paymentMethods = [];
        $scope.voucherProducts = [];
        $scope.flags = [];
        $scope.users = [];
        $scope.cutoffWeekDays = AppUtilsService.getCutoffWeekDays();
        $scope.loading = true;
        $scope.saving = false;
        $scope.tabSelected = 0;

        $scope.can = {
            createAny: $scope.$parent.$parent.hasPerm('CREATE_ANY_TAXES')
        };

        $scope.getPaymentMethodSrc = getPaymentMethodSrc;
        $scope.setPaymentMethodOnTax = setPaymentMethodOnTax;
        $scope.check = check;
        $scope.save = save;

        load();

        function getPaymentMethodSrc(paymentMethod){
            return 'app/pages/taxes/'+ paymentMethod.type.toLowerCase() + '-fields.html';
        }

        function setPaymentMethodOnTax(paymentMethod){
            $scope.tax.payment_methods_id = paymentMethod.id;
        }

        function load(){
            $scope.operators = OperatorService.query();
            $scope.paymentMethods = PaymentMethodService.query();
            $scope.voucherProducts = VoucherProductService.query();
            $scope.flags = FlagService.query();

            if($scope.can.createAny) $scope.users = UserService.query();

            var promises = [$scope.operators.$promise, $scope.paymentMethods.$promise, $scope.voucherProducts.$promise, $scope.flags.$promise];

            $q.all(promises).then(function(){
                if(!$scope.tax.id){
                    setPaymentMethodOnTax($scope.paymentMethods[0]);
                } else {
                    if($scope.tax.payment_method){
                        $scope.tabSelected = $scope.paymentMethods.findIndex(function(p){ return p.id === $scope.tax.payment_method.id; });
                    }
                }
                $scope.loading = false;
            });
        }

        function reset(){
            $scope.tax.tax_percentage = null;
            $scope.tax.payment_deadline_days = null;
        }

        function check(){
            if($scope.tax && $scope.tax.payment_methods_id && $scope.tax.flags_id){
                TaxService.check($scope.tax, checkSuccess, checkError);
            }
        }

        function save(){
            $scope.saving = true;
            if($scope.tax){
                $scope.tax.payment_deadline_days = ($scope.tax.payment_deadline_days) ? parseInt($scope.tax.payment_deadline_days) : 0;
                if($scope.tax.id){
                    TaxService.update($scope.tax, saveSuccess, saveError);
                } else {
                    TaxService.save($scope.tax, saveSuccess, saveError);
                }
            }
        }

        function saveSuccess(tax){
            AppUtilsService.showSuccessToast("Taxa salva");
            $state.go('taxes.list');
        }

        function saveError(data){
            AppUtilsService.showErrorToast("Ocorreu um erro ao salvar. Tente novamente mais tarde");
            $scope.saving = false;
        }

        function checkSuccess(data){
        }

        function checkError(response){
            var confirm = $mdDialog.confirm()
                .title('Configuração de Taxa já existente')
                .textContent('Já existe uma configuração de taxa para esse método de pagamento e bandeira. O que deseja fazer?')
                .ok('Editar Configuração existente')
                .cancel('Criar uma nova configuração');

            $mdDialog.show(confirm).then(function() {
                $state.go('taxes.edit', {id: response.data.id});
            });
        }

    }

})();