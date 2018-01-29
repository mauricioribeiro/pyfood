(function () {
    'use strict';

    angular.module('app.operators')
        .controller('OperatorsEditController', OperatorsEditController);

    function OperatorsEditController($scope, $state, entity, AppUtilsService, OperatorService) {
        $scope.operator = entity;
        $scope.saving = false;

        $scope.removeImage = removeImage;
        $scope.save = save;

        var $cloudinaryUploader = angular.element(document.querySelector('#cloudinary-uploader'));
        var cloudinaryConfig = AppUtilsService.getCloudinaryConfig();

        $cloudinaryUploader[0].addEventListener("click", function() {
            cloudinary.openUploadWidget(cloudinaryConfig,
                function(error, result) {
                    if(!error){
                        $scope.operator.photo_url = result[0].secure_url;
                        $scope.$apply();
                    } else {
                        AppUtilsService.showErrorToast('Falha ao subir a imagem. Tente novamente mais tarde.');
                        console.log(error, result);
                    }
                });
        }, false);

        function removeImage(){
            $scope.operator.photo_url = null;
        }

        function save(){
            $scope.saving = true;
            if($scope.operator){
                if($scope.operator.id){
                    OperatorService.update($scope.operator, saveSuccess, saveError);
                } else {
                    OperatorService.save($scope.operator, saveSuccess, saveError);
                }
            }
        }

        function saveSuccess(operator){
            AppUtilsService.showSuccessToast("Operadora " + operator.name + " salva");
            $state.go('operators.list');
        }

        function saveError(data){
            AppUtilsService.showErrorToast("Ocorreu um erro ao salvar. Tente novamente mais tarde");
            $scope.saving = false;
        }

    }

})();