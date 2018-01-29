(function () {
    'use strict';

    angular.module('app.payment_methods')
        .controller('PaymentMethodsEditController', PaymentMethodsEditController);

    function PaymentMethodsEditController($scope, $state, entity, AppUtilsService, PaymentMethodService) {
        $scope.paymentMethod = entity;
        $scope.allowedPaymentMethods = AppUtilsService.getAllowedPaymentMethods();
        $scope.isChecked = isChecked;
        $scope.save = save;

        function isChecked(){
            return $scope.paymentMethod && $scope.paymentMethod.uses_working_days;
        }

        function save(){
            if($scope.paymentMethod){
                if($scope.paymentMethod.id){
                    PaymentMethodService.update($scope.paymentMethod, saveSuccess);
                } else {
                    PaymentMethodService.save($scope.paymentMethod, saveSuccess);
                }
            }
        }

        function saveSuccess(paymentMethod){
            AppUtilsService.showSuccessToast("Modalidade " + paymentMethod.name + " salva");
            $state.go('payment-methods.list');
        }

    }

})();