(function () {
    'use strict';

    angular.module('app.users')
        .controller('UsersEditController', UsersEditController);

    function UsersEditController($scope, $state, entity, AppUtilsService, UserService, ProfileService, PersonService, CompanyService, BankService) {
        $scope.user = entity;
        $scope.profiles = ProfileService.query();
        $scope.banks = BankService.query();
        $scope.types = AppUtilsService.getOwnerTypes();
        $scope.saving = false;

        $scope.matchPasswords = matchPasswords;
        $scope.removeImage = removeImage;
        $scope.removePhone = removePhone;
        $scope.removeBankAccount = removeBankAccount;
        $scope.removeProprietary = removeProprietary;
        $scope.addPhone = addPhone;
        $scope.addBankAccount = addBankAccount;
        $scope.addProprietary = addProprietary;
        $scope.isCompany = isCompany;
        $scope.isPerson = isPerson;
        $scope.save = save;

        var $cloudinaryUploader = angular.element(document.querySelector('#cloudinary-uploader'));
        var cloudinaryConfig = AppUtilsService.getCloudinaryConfig();

        $cloudinaryUploader[0].addEventListener("click", function() {
            cloudinary.openUploadWidget(cloudinaryConfig,
                function(error, result) {
                    if(!error){
                        $scope.user.photo_url = result[0].secure_url;
                        $scope.$apply();
                    } else {
                        AppUtilsService.showErrorToast('Falha ao subir a imagem. Tente novamente mais tarde.');
                        console.log(error, result);
                    }
            });
        }, false);

        function matchPasswords(){
            if($scope.editForm.password.$dirty && $scope.editForm.confirm_password.$dirty && $scope.editForm.password.$modelValue !== $scope.editForm.confirm_password.$modelValue){
                $scope.editForm.password.$setValidity('noMatch', false);
                $scope.editForm.confirm_password.$setValidity('noMatch', false);
            } else {
                $scope.editForm.password.$setValidity('noMatch', true);
                $scope.editForm.confirm_password.$setValidity('noMatch', true);
            }
        }

        function removeImage(){
            $scope.user.photo_url = null;
        }

        function removePhone(index){
            $scope.user.phones.splice(index, 1);
        }

        function removeBankAccount(index){
            $scope.user.bank_accounts.splice(index, 1);
        }

        function removeProprietary(index){
            $scope.user.owner.proprietaries.splice(index, 1);
        }

        function addPhone(){
            if(!$scope.user.phones) $scope.user.phones = [];
            $scope.user.phones.push({number: null});
        }

        function addBankAccount(){
            if(!$scope.user.bank_accounts) $scope.user.bank_accounts = [];
            $scope.user.bank_accounts.push({
                bank_id: null,
                agency: null,
                number: null
            });
        }

        function addProprietary(){
            if(!$scope.user.owner) {
                $scope.user.owner = {
                    owner_type: 'App\\Company',
                    proprietaries: []
                };
            }

            if(!$scope.user.owner.proprietaries) $scope.user.owner.proprietaries = [];
            $scope.user.owner.proprietaries.push({
                name: null,
                rg: null,
                cpf: null,
                birth_date: null
            });
        }

        function isCompany(){
            return $scope.user.owner_type == 'App\\Company';
        }

        function isPerson(){
            return $scope.user.owner_type == 'App\\Person';
        }

        function save(){
            $scope.saving = true;
            if($scope.user.owner){
                if($scope.user.owner_type === 'App\\Person'){
                    PersonService[($scope.user.owner_id) ? 'update' : 'save']($scope.user.owner, saveByOwnerUser, saveError);
                } else {
                    CompanyService[($scope.user.owner_id) ? 'update' : 'save']($scope.user.owner, saveByOwnerUser, saveError);
                }
            }
        }

        function saveByOwnerUser(owner){
            $scope.user.owner_id = owner.id;
            UserService[($scope.user.id) ? 'update' : 'save']($scope.user, saveSuccess, saveError);
        }

        function saveSuccess(user){
            AppUtilsService.showSuccessToast("Usuário " + user.name + " salvo");
            $state.go('users.list');
            if($scope.user.id === $scope.$parent.$parent.myUser.id){
                $scope.$parent.$parent.myUser.photo_url = $scope.user.photo_url;
            }
        }

        function saveError(data){
            AppUtilsService.showErrorToast("Ocorreu um erro ao salvar. Tente novamente mais tarde");
            $scope.saving = false;
        }

    }

})();