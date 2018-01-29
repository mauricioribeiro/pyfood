(function () {
    'use strict';

    angular.module('app.flags')
        .controller('FlagsEditController', FlagsEditController);

    function FlagsEditController($scope, $state, entity, AppUtilsService, FlagService, PaymentMethodService) {
        $scope.flag = entity;
        $scope.paymentMethods = PaymentMethodService.query();
        $scope.saving = false;

        $scope.removeImage = removeImage;
        $scope.isChecked = isChecked;
        $scope.save = save;

        var $cloudinaryUploader = angular.element(document.querySelector('#cloudinary-uploader'));
        var cloudinaryConfig = AppUtilsService.getCloudinaryConfig();

        $cloudinaryUploader[0].addEventListener("click", function() {
            cloudinary.openUploadWidget(cloudinaryConfig,
                function(error, result) {
                    if(!error){
                        $scope.flag.photo_url = result[0].secure_url;
                        $scope.$apply();
                    } else {
                        AppUtilsService.showErrorToast('Falha ao subir a imagem. Tente novamente mais tarde.');
                        console.log(error, result);
                    }
                });
        }, false);

        function removeImage(){
            $scope.flag.photo_url = null;
        }

        function isChecked(){
            return $scope.flag && $scope.flag.has_transaction_tax;
        }

        function save(){
            $scope.saving = true;
            if($scope.flag){
                if($scope.flag.id){
                    FlagService.update($scope.flag, saveSuccess, saveError);
                } else {
                    FlagService.save($scope.flag, saveSuccess, saveError);
                }
            }
        }

        function saveSuccess(flag){
            AppUtilsService.showSuccessToast("Bandeira " + flag.name + " salva");
            $state.go('flags.list');
        }

        function saveError(data){
            AppUtilsService.showErrorToast("Ocorreu um erro ao salvar. Tente novamente mais tarde");
            $scope.saving = false;
        }

    }

})();