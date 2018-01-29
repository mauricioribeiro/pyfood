(function () {
    'use strict';

    angular.module('app')
        .controller('ReportCtrl', ['$scope', '$http', '$filter', 'AppUtilsService', 'RestService', 'ReportService', 'UserService', 'FlagService', 'PaymentMethodService', ReportCtrl])

    function ReportCtrl($scope, $http, $filter, AppUtilsService, RestService, ReportService, UserService, FlagService, PaymentMethodService) {

        $scope.clear = clear;
        $scope.generate = generate;
        $scope.onClientChange = onClientChange;
        $scope.onClientSelected = onClientSelected;
        $scope.queryClients = queryClients;
        $scope.hasPerm = $scope.$parent.hasPerm;

        $scope.clients = [];
        $scope.types = loadTypes();
        // $scope.flags = FlagService.query();
        $scope.paymentMethods = PaymentMethodService.query();
        $scope.client = null;
        $scope.filter = null;
        $scope.generating = false;
        $scope.search = {};

        clear();
        loadClients();

        function clear(){
            $scope.filter = {
                types: null,
                flag_id: null,
                payment_method_id: null,
                start_date: null,
                end_date: null,
                created_by: null
            };
            $scope.search = {};
            $scope.client = null;
        }

        function generate(){
            $scope.generating = true;

            $http({
                method: 'POST',
                url: RestService.getURI() + 'reports/generate',
                dataType: 'json',
                data: prepareFilter($scope.filter),
                responseType: 'arraybuffer'
            }).then(reportSuccess, reportError);
        }

        function sort(clients){
            clients.sort(function (a, b) {
                if (a.display < b.display)
                    return -1;
                if (a.display > b.display)
                    return 1;
                return 0;
            });
        }

        function loadTypes(){
            return [
                {id: "sales", name: "Vendas"},
                {id: "taxes", name: "Configuração de Taxas"},
                {id: "anticipations", name: "Antecipações"},
                {id: "pos", name: "POS"},
            ];
        }

        function loadClients(){
            if($scope.hasPerm('GENERATE_FULL_REPORTS')){
                UserService.query().$promise.then(function(clients){
                   clients.forEach(function(client){
                       client.display = client.name + " " + (client.owner.cpf || client.owner.cnpj || "");
                       $scope.clients.push(client);
                   });
                   sort($scope.clients);
                });
            }

        }

        function onClientChange(search){

        }

        function onClientSelected(client){
            if(client){
                $scope.filter.created_by = client.id;
            }
        }

        function queryClients(search){
            if(search){
                return $scope.clients.filter(function(c){
                    return c.display.match(search);
                });
            }
            return $scope.clients;
        }

        function prepareFilter(filter){
            filter.start_date = (filter.start_date) ? $filter('date')(filter.start_date, 'yyyy-MM-dd') : null;
            filter.end_date = (filter.end_date) ? $filter('date')(filter.end_date, 'yyyy-MM-dd') : null;

            if(!$scope.hasPerm('GENERATE_FULL_REPORTS'))
                filter.created_by = null;

            return filter;
        }

        function reportSuccess(response, status, headers, config){
            var fileName = "Relatório";

            if($scope.clients.length){
                var client = $scope.clients.find(function(c){ return c.id === $scope.filter.created_by });
                if(client){
                    fileName += " - " + client.name;
                }
            }

            $scope.generating = false;
            var blob = new Blob([response.data],
                {type: 'application/vnd.openxmlformat-officedocument.spreadsheetml.sheet;'});
            saveAs(blob, fileName + ".xls");
        }

        function reportError(response, status, headers, config){
            $scope.generating = false;
            AppUtilsService.showErrorToast("Ocorreu um erro ao gerar relatório. Tente novamente mais tarde");
            console.log(response);
        }

    }


})(); 
