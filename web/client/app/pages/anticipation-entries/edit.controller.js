(function () {
    'use strict';

    angular.module('app.anticipationEntries')
        .controller('AnticipationEntriesEditController', AnticipationEntriesEditController);

    function AnticipationEntriesEditController($scope, $state, entity, AppUtilsService, AnticipationEntryService, OperatorService, FlagService, BankService) {
        $scope.anticipationEntry = entity;
        $scope.types = AppUtilsService.getAnticipationEntryTypes();
        $scope.sources = [];
        $scope.saving = false;

        $scope.getSources = getSources;
        $scope.isVoucher = isVoucher;
        $scope.save = save;

        getSources();

        function getSources(){
            $scope.sources = [];
            $scope.operators = OperatorService.query(function(operators){
                operators.forEach(function(o){
                    $scope.sources.push(extractSource(o, "App\\Operator"));
                });
            });

            $scope.banks = BankService.query(function(banks){
                banks.forEach(function(b){
                    $scope.sources.push(extractSource(b, "App\\Bank"));
                });
            });

            $scope.flags = FlagService.query(function(flags){
                flags.forEach(function(f){
                    $scope.sources.push(extractSource(f, "App\\Flag"));
                });
            });
        }

        function isVoucher(){
            return $scope.anticipationEntry && $scope.anticipationEntry.type === "VOUCHER";
        }

        function extractSource(item, type){
            return {
                id: item.id,
                name: item.name,
                type: type,
                selected: $scope.anticipationEntry && $scope.anticipationEntry.source_id === item.id && $scope.anticipationEntry.source_type === item.type
            };
        }

        function save(){
            $scope.saving = true;
            if($scope.anticipationEntry){
                $scope.anticipationEntry.source_id = $scope.anticipationEntry.source.id;
                $scope.anticipationEntry.source_type = $scope.anticipationEntry.source.type;

                if($scope.anticipationEntry.id){
                    AnticipationEntryService.update($scope.anticipationEntry, saveSuccess, saveError);
                } else {
                    AnticipationEntryService.save($scope.anticipationEntry, saveSuccess, saveError);
                }
            }
        }

        function saveSuccess(anticipationEntry){
            AppUtilsService.showSuccessToast("Lançamento de antecipação #" + anticipationEntry.id + " salvo");
            $state.go('anticipation-entries.list');
        }

        function saveError(data){
            AppUtilsService.showErrorToast("Ocorreu um erro ao salvar. Tente novamente mais tarde");
            $scope.saving = false;
        }

    }

})();