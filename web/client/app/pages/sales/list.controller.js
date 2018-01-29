(function () {
    'use strict';

    angular.module('app.sales')
        .controller('SalesListController', SalesListController);

    function SalesListController($scope, $state, $filter, AppUtilsService, RestService, SaleService) {
        $scope.limitOptions = [5, 10, 15];
        
        $scope.query = {
            order: '-id',
            limit: 10,
            page: 1
        };
        $scope.can = {
            edit: $scope.$parent.$parent.hasPerm('UPDATE_SALES'),
            delete: $scope.$parent.$parent.hasPerm('DELETE_SALES')
        };

        $scope.pagination = RestService.getDefaultPagination();
        $scope.sales = RestService.getDefaultDataList();
        $scope.cutoffWeekDays = AppUtilsService.getCutoffWeekDays();
        $scope.load = load;
        $scope.edit = edit;
        $scope.remove = remove;
        $scope.getEstimatedDateTooltip = getEstimatedDateTooltip;
        $scope.getNetValueTooltip = getNetValueTooltip;

        load();

        function load(){
            $scope.promise = SaleService.query().$promise;
            $scope.promise.then(loadSuccess, loadError);
        }

        function edit(sale){
            $state.go('sales.edit', {id: sale.id});
        }

        function remove(sale){
            AppUtilsService.showDeleteDialog(function(){
                SaleService.delete({id: sale.id}, function(){
                    AppUtilsService.showSuccessToast("Venda deletada");
                    $scope.sales.data = $scope.sales.data.filter(function(s){ return s.id !== sale.id; });
                    $scope.sales.count = $scope.sales.data.length;
                });
            });
        }

        function getNetValueTooltip(sale){
            return $filter('number')(sale.tax.tax_percentage, 2) + '% de taxa de ' + sale.tax.payment_method.name + ((sale.tax.type === "VOUCHER" && sale.tax.additional && sale.tax.additional.tariff_value) ? ' + ' + $filter('currency')(sale.tax.additional.tariff_value, 'R$ ') + ' de tarifa' : '');
        }

        function getEstimatedDateTooltip(sale){
            if(sale.tax){
                if(sale.tax.type === "VOUCHER" && sale.tax.additional){
                    if(sale.tax.additional.cutoff_weekday !== null){
                        return sale.tax.additional.repayment_days + ' dias após a data da venda + dia de corte (periodicamente ' + $scope.cutoffWeekDays.find(function(d){ return d.value === sale.tax.additional.cutoff_weekday}).name + ')';
                    }
                    return sale.tax.additional.repayment_days + ' dias após a data de venda';
                } else {
                    if(sale.tax.payment_method.uses_working_days){
                        return sale.tax.payment_deadline_days + ' dia' + ((sale.tax.payment_deadline_days != 1) ? 's úteis' : ' útil') + ' após a data da venda';
                    } else {
                        return sale.tax.payment_deadline_days + ' dia' + ((sale.tax.payment_deadline_days != 1) ? 's' : '') + ' após a data da venda';
                    }
                }
            }
            return 'O sistema não identificou nenhuma taxa para esta venda';
        }

        function loadSuccess(data){
            $scope.sales.data = data || [];
            $scope.sales.count = $scope.sales.data.length;
        }

        function loadError(data){
            console.log(data);
        }
    }

})(); 