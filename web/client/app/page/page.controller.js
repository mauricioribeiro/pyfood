(function () {
    'use strict';

    angular.module('app.page')
        .controller('invoiceCtrl', ['$scope', '$window', invoiceCtrl])
        .controller('authCtrl', ['$scope', '$state', '$location', 'AppUtilsService', 'AuthService', 'UserService', authCtrl]);

    function invoiceCtrl($scope, $window) {
        var printContents, originalContents, popupWin;

        $scope.printInvoice = function() {
            printContents = document.getElementById('invoice').innerHTML;
            originalContents = document.body.innerHTML;
            popupWin = window.open();
            popupWin.document.open();
            popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="styles/main.css" /></head><body onload="window.print()">' + printContents + '</html>');
            popupWin.document.close();
        }
    }

    function authCtrl($scope, $state, $location, AppUtilsService, AuthService, UserService) {
        $scope.user = {};
        $scope.logging = false;

        AuthService.logout();

        $scope.login = function() {
            $scope.logging = true;
            AuthService.login($scope.user.username, $scope.user.password, loginSuccess, loginError);
        };

        $scope.signup = function() {
            $location.url('/')
        };

        $scope.reset =    function() {
            $location.url('/')
        };

        $scope.unlock =    function() {
            $location.url('/')
        };

        function loginSuccess(){
            $scope.$parent.myUser = UserService.getMyUser(function(response){

                var curHr = (new Date()).getHours();
                var greetings = "Boa noite";
                if (curHr < 12) {
                    greetings = "Bom dia";
                } else if (curHr < 18) {
                    greetings = "Boa tarde";
                }

                AppUtilsService.showSuccessToast(greetings + " " + response.data.owner.name + ", bem vindo ao sistema!");
                $state.go('dashboard');
            });
        }

        function loginError(){
            $scope.logging = false;
            AppUtilsService.showErrorToast('Ops, seu usuário ou senha parece estar incorreto...');
        }
    }

})(); 



