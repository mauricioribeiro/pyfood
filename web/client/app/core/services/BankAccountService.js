(function () {
    'use strict';

    angular.module('app.services')
        .service('BankAccountService', BankAccountService);

    /** @ngInject */
    function BankAccountService($resource, RestService) {

        var resourceURI = RestService.getURI() + 'bank-accounts/:id';

        return $resource(resourceURI, {}, {
            'query': { method: 'GET', isArray: true, transformResponse: RestService.transformResponses},
            'get': {
                method: 'GET',
                url: resourceURI + '/',
                transformResponse: RestService.transformResponse
            },
            'update': {
                method: 'PUT',
                url: resourceURI + '/',
                params: {id: "@id"},
                transformRequest: RestService.transformRequest
            },
            'delete': {
                method: 'DELETE',
                url: resourceURI + '/',
                params: {id: "@id"}
            },
            'save': {
                method: 'POST',
                transformRequest: RestService.transformRequest
            }
        });
    }

})(); 