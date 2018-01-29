(function () {
    'use strict';

    angular.module('app.services')
        .service('ReceiptService', ReceiptService);

    /** @ngInject */
    function ReceiptService($resource, $filter, RestService) {

        var resourceURI = RestService.getURI() + 'receipts/:id';

        function transformRequest(requestData){
            if(requestData){
                requestData.estimated_date = (requestData.estimated_date) ? $filter('date')(requestData.estimated_date, 'yyyy-MM-dd') : null;
            }
            return RestService.transformRequest(requestData);
        }

        function transformResponse(responseData){
            if(responseData){
                responseData = angular.fromJson(responseData);
                responseData.estimated_date = (responseData.estimated_date) ? new Date(responseData.estimated_date) : null;
            }
            return RestService.transformResponse(responseData);
        }

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
            },
            'calendar': {
                url: RestService.getURI() + 'receipts/calendar',
                method: 'POST',
                isArray: true,
                transformRequest: transformRequest,
                transformResponse: transformResponse
            }
        });
    }

})(); 