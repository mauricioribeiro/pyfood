(function () {
    'use strict';

    angular.module('app.pointsOfSale')
        .controller('PointsOfSaleListController', PointsOfSaleListController);

    function PointsOfSaleListController($scope, $state, AppUtilsService, RestService, PointOfSaleService) {
        $scope.limitOptions = [5, 10, 15];
        
        $scope.query = {
            order: 'code',
            limit: 10,
            page: 1
        };
        $scope.can = {
            edit: $scope.$parent.$parent.hasPerm('UPDATE_POINTS_OF_SALE'),
            delete: $scope.$parent.$parent.hasPerm('DELETE_POINTS_OF_SALE')
        };

        $scope.pagination = RestService.getDefaultPagination();
        $scope.pointsOfSale = RestService.getDefaultDataList();
        $scope.load = load;
        $scope.edit = edit;
        $scope.remove = remove;

        load();

        function load(){
            $scope.promise = PointOfSaleService.query().$promise;
            $scope.promise.then(loadSuccess, loadError);
        }

        function edit(pointOfSale){
            $state.go('points-of-sale.edit', {id: pointOfSale.id});
        }

        function remove(pointOfSale){
            AppUtilsService.showDeleteDialog(function(){
                PointOfSaleService.delete({id: pointOfSale.id}, function(){
                    AppUtilsService.showSuccessToast("POS " + pointOfSale.code + " deletada");
                    $scope.pointsOfSale.data = $scope.pointsOfSale.data.filter(function(u){ return u.id !== pointOfSale.id; });
                    $scope.pointsOfSale.count = $scope.pointsOfSale.data.length;
                });
            });
        }

        function loadSuccess(data){
            $scope.pointsOfSale.data = data || [];
            $scope.pointsOfSale.count = $scope.pointsOfSale.data.length;
        }

        function loadError(data){
            console.log(data);
        }
    }

})(); 