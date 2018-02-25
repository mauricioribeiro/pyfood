(function () {
    'use strict';

    angular.module('app')
        .controller('DashboardCtrl', ['$scope', 'OrderService', DashboardCtrl])

    function DashboardCtrl($scope, OrderService) {
        $scope.orders = [];

        $scope.load = function(){
            $scope.orders = OrderService.query();
        };

        $scope.load();
    }


})();
