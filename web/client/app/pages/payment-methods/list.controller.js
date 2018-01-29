(function () {
    'use strict';

    angular.module('app.payment_methods')
        .controller('PaymentMethodsListController', PaymentMethodsListController);

    function PaymentMethodsListController($scope, $state, AppUtilsService, RestService, PaymentMethodService) {
        $scope.limitOptions = [5, 10, 15];
        
        $scope.query = {
            order: 'name',
            limit: 10,
            page: 1
        };
        $scope.can = {
            edit: $scope.$parent.$parent.hasPerm('UPDATE_PAYMENT_METHODS'),
            delete: $scope.$parent.$parent.hasPerm('DELETE_PAYMENT_METHODS')
        };

        $scope.pagination = RestService.getDefaultPagination();
        $scope.paymentMethods = RestService.getDefaultDataList();
        $scope.allowedPaymentMethods = AppUtilsService.getAllowedPaymentMethods();
        $scope.load = load;
        $scope.edit = edit;
        $scope.remove = remove;

        load();

        function load(){
            $scope.promise = PaymentMethodService.query().$promise;
            $scope.promise.then(loadSuccess, loadError);
        }

        function edit(paymentMethod){
            $state.go('payment-methods.edit', {id: paymentMethod.id});
        }

        function remove(paymentMethod){
            AppUtilsService.showDeleteDialog(function(){
                PaymentMethodService.delete({id: paymentMethod.id}, function(){
                    AppUtilsService.showSuccessToast("Modalidade " + paymentMethod.name + " deletada");
                    $scope.paymentMethods.data = $scope.paymentMethods.data.filter(function(u){ return u.id !== paymentMethod.id; });
                    $scope.paymentMethods.count = $scope.paymentMethods.data.length;
                });
            });
        }

        function loadSuccess(data){
            $scope.paymentMethods.data = data || [];
            $scope.paymentMethods.count = $scope.paymentMethods.data.length;
        }

        function loadError(data){
            console.log(data);
        }
    }

})(); 