(function () {
    'use strict';

    angular.module('app')
        .controller('AppCtrl', ['$scope', '$rootScope', '$state', '$document', 'appConfig', 'AppUtilsService', 'AuthService', 'UserService', AppCtrl]); // overall control
    
    function AppCtrl($scope, $rootScope, $state, $document, appConfig, AppUtilsService, AuthService, UserService) {

        $scope.pageTransitionOpts = appConfig.pageTransitionOpts;
        $scope.main = appConfig.main;
        $scope.color = appConfig.color;
        $scope.myUser = null;

        UserService.getMyUser(getMyUserSuccess, getMyUserError);

        $scope.logout = function(){
            AuthService.logout(function(){
                $scope.myUser = null;
                $state.go('login');
            });
        };

        $scope.hasPerm = function(permission){
            if($scope.myUser && $scope.myUser.permissions){
                return $scope.myUser.permissions.some(function(p){ return p.slug === permission; });
            }
            return false;
        };

        $scope.$watch('main', function(newVal, oldVal) {
            // if (newVal.menu !== oldVal.menu || newVal.layout !== oldVal.layout) {
            //     $rootScope.$broadcast('layout:changed');
            // }

            if (newVal.menu === 'horizontal' && oldVal.menu === 'vertical') {
                $rootScope.$broadcast('nav:reset');
            }
            if (newVal.fixedHeader === false && newVal.fixedSidebar === true) {
                if (oldVal.fixedHeader === false && oldVal.fixedSidebar === false) {
                    $scope.main.fixedHeader = true;
                    $scope.main.fixedSidebar = true;
                }
                if (oldVal.fixedHeader === true && oldVal.fixedSidebar === true) {
                    $scope.main.fixedHeader = false;
                    $scope.main.fixedSidebar = false;
                }
            }
            if (newVal.fixedSidebar === true) {
                $scope.main.fixedHeader = true;
            }
            if (newVal.fixedHeader === false) {
                $scope.main.fixedSidebar = false;
            }
        }, true);

        $rootScope.$on("$stateChangeSuccess", function (event, currentRoute, previousRoute) {
            $document.scrollTo(0, 0);
        });

        function getMyUserSuccess(response){
            $scope.myUser = response.data;
        }
        function getMyUserError(data){
            AppUtilsService.showErrorToast('Ops, parece que você está deslogado...');
            $state.go('login');
        }
    }

})(); 