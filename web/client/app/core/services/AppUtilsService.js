(function () {
    'use strict';

    angular.module('app.services')
        .service('AppUtilsService', AppUtilsService);

    function AppUtilsService($mdToast, $mdDialog) {

        this.showSuccessToast = showSuccessToast;
        this.showErrorToast = showErrorToast;
        this.showDialog = showDialog;
        this.showDeleteDialog = showDeleteDialog;
        this.getNotificationModel = getNotificationModel;

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

        function getNotificationModel(data){

            /*
            ORDER_LIST_ITEMS = 'order.list_items'
            ORDER_FINISH = 'order.finish'
            ORDER_CONFIRM = 'order.confirm'
            */

            var notification = data;

            switch(data.action){
                case "order.create":
                    notification.icon = "shopping_cart";
                    notification.text = "iniciou um pedido";
                    break;

                case "order.add_item":
                    notification.icon = "exposure_plus_1";
                    notification.text = "adicionou um item no seu pedido";
                    break;

                case "order.remove_item":
                    notification.icon = "exposure_neg_1";
                    notification.text = "removeu um item no seu pedido";
                    break;

                case "order.finish":
                    notification.icon = "archive";
                    notification.text = "finalizou seu pedido";
                    break;

            }
            return notification;
        }

    }

})();
