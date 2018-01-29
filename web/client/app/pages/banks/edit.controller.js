(function () {
    'use strict';

    angular.module('app.banks')
        .controller('BanksEditController', BanksEditController);

    function BanksEditController($scope, $state, entity, AppUtilsService, BankService) {
        $scope.bank = entity;
        $scope.saving = false;

        $scope.removeImage = removeImage;
        $scope.isChecked = isChecked;
        $scope.save = save;

        // var $cloudinaryUploader = angular.element(document.querySelector('#cloudinary-uploader'));
        // var cloudinaryConfig = AppUtilsService.getCloudinaryConfig();
        //
        // $cloudinaryUploader[0].addEventListener("click", function() {
        //     cloudinary.openUploadWidget(cloudinaryConfig,
        //         function(error, result) {
        //             if(!error){
        //                 $scope.bank.photo_url = result[0].secure_url;
        //                 $scope.$apply();
        //             } else {
        //                 AppUtilsService.showErrorToast('Falha ao subir a imagem. Tente novamente mais tarde.');
        //                 console.log(error, result);
        //             }
        //         });
        // }, false);

        function removeImage(){
            $scope.bank.photo_url = null;
        }

        function isChecked(){
            return $scope.bank && $scope.bank.has_transaction_tax;
        }

        function save(){
            $scope.saving = true;
            if($scope.bank){
                if($scope.bank.id){
                    BankService.update($scope.bank, saveSuccess, saveError);
                } else {
                    BankService.save($scope.bank, saveSuccess, saveError);
                }
            }
        }

        function saveSuccess(bank){
            AppUtilsService.showSuccessToast("Banco " + bank.name + " salvo");
            $state.go('banks.list');
        }

        function saveError(data){
            AppUtilsService.showErrorToast("Ocorreu um erro ao salvar. Tente novamente mais tarde");
            $scope.saving = false;
        }

    }

})();