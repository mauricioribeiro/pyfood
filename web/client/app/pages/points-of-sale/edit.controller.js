(function () {
    'use strict';

    angular.module('app.pointsOfSale')
        .controller('PointsOfSaleEditController', PointsOfSaleEditController);

    function PointsOfSaleEditController($scope, $state, entity, AppUtilsService, PointOfSaleService, OperatorService) {
        $scope.pointOfSale = entity;
        $scope.operators = OperatorService.query();
        $scope.types = AppUtilsService.getPointOfSaleTypes();
        $scope.months = AppUtilsService.getMonths();
        $scope.days = [];
        $scope.saving = false;

        $scope.removeImage = removeImage;
        $scope.isLending = isLending;
        $scope.getDays = getDays;
        $scope.save = save;

        var $cloudinaryUploader = angular.element(document.querySelector('#cloudinary-uploader'));
        var cloudinaryConfig = AppUtilsService.getCloudinaryConfig();

        $cloudinaryUploader[0].addEventListener("click", function() {
            cloudinary.openUploadWidget(cloudinaryConfig,
                function(error, result) {
                    if(!error){
                        $scope.pointOfSale.photo_url = result[0].secure_url;
                        $scope.$apply();
                    } else {
                        AppUtilsService.showErrorToast('Falha ao subir a imagem. Tente novamente mais tarde.');
                        console.log(error, result);
                    }
                });
        }, false);

        getDays();

        function removeImage(){
            $scope.pointOfSale.photo_url = null;
        }

        function getDays(){
            if($scope.pointOfSale.due_month){
                $scope.days = AppUtilsService.getDays($scope.pointOfSale.due_month);
            }
        }

        function isLending(){
            return $scope.pointOfSale && $scope.pointOfSale.type === "LENDING";
        }

        function save(){
            $scope.saving = true;
            if($scope.pointOfSale){
                if($scope.pointOfSale.id){
                    PointOfSaleService.update($scope.pointOfSale, saveSuccess, saveError);
                } else {
                    PointOfSaleService.save($scope.pointOfSale, saveSuccess, saveError);
                }
            }
        }

        function saveSuccess(pointOfSale){
            AppUtilsService.showSuccessToast("POS " + pointOfSale.code + " salva");
            $state.go('points-of-sale.list');
        }

        function saveError(data){
            AppUtilsService.showErrorToast("Ocorreu um erro ao salvar. Tente novamente mais tarde");
            $scope.saving = false;
        }

    }

})();