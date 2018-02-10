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
        $scope.notificationsSize = 5;

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

        function receiveCallback(notification){
            $scope.notifications.pop(AppUtilsService.getNotificationModel(notification));

            if($scope.notifications.length > $scope.notificationsSize)
                $scope.notifications = $scope.notifications.slice(0, $scope.notificationsSize);

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
            $scope.notifications = (data.length < 5) ? data : data.slice(0, 5);
            $scope.notifications.map(function(n){ return AppUtilsService.getNotificationModel(n) });

            NotificationService.setReceiveCallback(receiveCallback);
            NotificationService.connect();
        }
    }

})();
