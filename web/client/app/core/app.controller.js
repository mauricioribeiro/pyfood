(function () {
    'use strict';

    angular.module('app')
        .controller('AppCtrl', ['$scope', '$rootScope', '$state', '$document', 'appConfig', 'AppUtilsService', 'AuthService', 'UserService', 'MessageService', 'NotificationService', AppCtrl]); // overall control

    function AppCtrl($scope, $rootScope, $state, $document, appConfig, AppUtilsService, AuthService, UserService, MessageService, NotificationService) {

        $scope.pageTransitionOpts = appConfig.pageTransitionOpts;
        $scope.main = appConfig.main;
        $scope.color = appConfig.color;
        $scope.myUser = null;
        $scope.notifications = [];
        $scope.notificationsSize = 4;

        //UserService.getMyUser(getMyUserSuccess, getMyUserError);
        getMyUserSuccess({id: 1, name: "Py Food Bot"}); // TODO remove mock user

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

        $scope.visualize = function(notification){
            MessageService.visualize(notification).$promise.then(visualizeSuccess);
        };

        $scope.$watch('main', function(newVal, oldVal) {
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

        function receiveCallback(notification){
            $scope.notifications.pop(AppUtilsService.getNotificationModel(notification));
            $scope.$apply();
        }

        function getMyUserSuccess(response){
            $scope.myUser = response.data;
            MessageService.notifications().$promise.then(getNotificationsSuccess);
        }

        function getMyUserError(data){
            AppUtilsService.showErrorToast('Ops, parece que você está deslogado...');
            $state.go('login');
        }

        function getNotificationsSuccess(data){
            $scope.notifications = data.map(function(n){ return AppUtilsService.getNotificationModel(n) });

            NotificationService.setReceiveCallback(receiveCallback);
            NotificationService.connect();
        }

        function visualizeSuccess(data){
            $scope.notifications = $scope.notifications.filter(function(n){ return n.id !== data.id });
            // TODO go to order page
        }
    }

})();
