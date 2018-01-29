(function () {
    'use strict';

    angular.module('app.anticipationEntries')
        .controller('AnticipationEntriesListController', AnticipationEntriesListController);

    function AnticipationEntriesListController($scope, $state, AppUtilsService, RestService, AnticipationEntryService) {
        $scope.limitOptions = [5, 10, 15];
        
        $scope.query = {
            order: 'code',
            limit: 10,
            page: 1
        };
        $scope.can = {
            edit: $scope.$parent.$parent.hasPerm('UPDATE_ANTICIPATION_ENTRIES'),
            delete: $scope.$parent.$parent.hasPerm('DELETE_ANTICIPATION_ENTRIES')
        };

        $scope.pagination = RestService.getDefaultPagination();
        $scope.anticipationEntries = RestService.getDefaultDataList();
        $scope.types = AppUtilsService.getAnticipationEntryTypes();

        $scope.load = load;
        $scope.edit = edit;
        $scope.remove = remove;
        $scope.getTypeName = getTypeName;

        load();

        function load(){
            $scope.promise = AnticipationEntryService.query().$promise;
            $scope.promise.then(loadSuccess, loadError);
        }

        function edit(anticipationEntry){
            $state.go('anticipation-entries.edit', {id: anticipationEntry.id});
        }

        function remove(anticipationEntry){
            AppUtilsService.showDeleteDialog(function(){
                AnticipationEntryService.delete({id: anticipationEntry.id}, function(){
                    AppUtilsService.showSuccessToast("Lançamento de antecipação " + anticipationEntry.code + " deletado");
                    $scope.anticipationEntries.data = $scope.anticipationEntries.data.filter(function(u){ return u.id !== anticipationEntries.id; });
                    $scope.anticipationEntries.count = $scope.anticipationEntries.data.length;
                });
            });
        }

        function getTypeName(anticipationEntry){
            return anticipationEntry && anticipationEntry.type ? $scope.types.find(function(t){ return t.value === anticipationEntry.type; }).name : '---';
        }

        function loadSuccess(data){
            $scope.anticipationEntries.data = data || [];
            $scope.anticipationEntries.count = $scope.anticipationEntries.data.length;
        }

        function loadError(data){
            console.log(data);
        }
    }

})(); 