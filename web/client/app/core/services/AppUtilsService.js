(function () {
    'use strict';

    angular.module('app.services')
        .service('AppUtilsService', AppUtilsService);

    function AppUtilsService($mdToast, $mdDialog) {

        this.showSuccessToast = showSuccessToast;
        this.showErrorToast = showErrorToast;
        this.showDialog = showDialog;
        this.showDeleteDialog = showDeleteDialog;
        this.getCloudinaryConfig = getCloudinaryConfig;
        this.getAllowedPaymentMethods = getAllowedPaymentMethods;
        this.getOwnerTypes = getOwnerTypes;
        this.getPointOfSaleTypes = getPointOfSaleTypes;
        this.getAnticipationEntryTypes = getAnticipationEntryTypes;
        this.getCutoffWeekDays = getCutoffWeekDays;
        this.getDays = getDays;
        this.getMonths = getMonths;

        function showSuccessToast(message){
            $mdToast.show($mdToast.simple()
                .toastClass('toast-success')
                .content(message)
                .position('top right'));
        }

         function showErrorToast(message){
            $mdToast.show($mdToast.simple()
                .toastClass('toast-error')
                .content(message)
                .position('top right'));
        }

        function showDialog(title, message, okButton, cancelButton, okCallback, cancelCallback){
            var confirm = $mdDialog.confirm({
                    onComplete: function afterShowAnimation() {
                        var $dialog = angular.element(document.querySelector('md-dialog'));
                        var $actionsSection = $dialog.find('md-dialog-actions');
                        var $cancelButton = $actionsSection.children()[0];
                        var $confirmButton = $actionsSection.children()[1];
                        angular.element($confirmButton).addClass('md-raised md-warn');
                    }
                })
                .title(title)
                .textContent(message)
                .ok(okButton)
                .cancel(cancelButton);

            $mdDialog.show(confirm).then(okCallback, cancelCallback || function(){});
        }

        function showDeleteDialog(okCallback, cancelCallback){
            showDialog("Deletar item", "Deseja deletar permanentemente este item?", "Deletar item", "Cancelar", okCallback, cancelCallback);
        }

        function getCloudinaryConfig(){
            return {
                cloud_name: 'mauricioribeiro',
                upload_preset: 'posvale'
            }
        }

        function getAllowedPaymentMethods(){
            return {
                DEBITO: "Débito",
                CREDITO: "Crédito",
                VOUCHER: "Voucher",
                PARCELADO: "Parcelado"
            };
        }

        function getOwnerTypes(){
            return [
                {name: "Pessoa Física", value: "App\\Person"},
                {name: "Pessoa Jurídica", value: "App\\Company"}
            ];
        }

        function getPointOfSaleTypes(){
            return [
                {name: "Comodato", value: "LENDING"},
                {name: "Própria", value: "OWN"}
            ];
        }

        function getCutoffWeekDays(){
            return [
                {name: "Nenhum", value: null},
                {name: "Domingo", value: '0'},
                {name: "Segunda-Feira", value: '1'},
                {name: "Terça-Feira", value: '2'},
                {name: "Quarta-Feira", value: '3'},
                {name: "Quinta-Feira", value: '4'},
                {name: "Sexta-Feira", value: '5'},
                {name: "Sábado", value: '6'}
            ];
        }

        function getMonths(){
            return [
                {name: "Janeiro", value: 1},
                {name: "Fevereiro", value: 2},
                {name: "Março", value: 3},
                {name: "Abril", value: 4},
                {name: "Maio", value: 5},
                {name: "Junho", value: 6},
                {name: "Julho", value: 7},
                {name: "Agosto", value: 8},
                {name: "Setembro", value: 9},
                {name: "Outubro", value: 10},
                {name: "Novembro", value: 11},
                {name: "Dezembro", value: 12}
            ];
        }

        function getDays(month, year) {
            year = (typeof year === 'undefined') ? new Date().getYear() : year;
            var total = new Date(year, month, 0).getDate();
            var days = [];
            for(var i = 1; i <= total; i++) days.push(i);
            return days;
        }

        function getAnticipationEntryTypes(){
            var methods = getAllowedPaymentMethods();
            return [
                {name: methods.CREDITO, value: "CREDITO"},
                {name: methods.VOUCHER, value: "VOUCHER"}
            ];
        }

    }

})(); 