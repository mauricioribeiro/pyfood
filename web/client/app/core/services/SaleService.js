(function () {
    'use strict';

    angular.module('app.services')
        .service('SaleService', SaleService);

    /** @ngInject */
    function SaleService($resource, $filter, RestService) {

        var resourceURI = RestService.getURI() + 'sales/:id';

        function transformRequest(requestData){
            if(requestData){
                requestData.sales_date = (requestData.sales_date) ? $filter('date')(requestData.sales_date, 'yyyy-MM-dd') : null;
            }
            return RestService.transformRequest(requestData);
        }

        function transformResponse(responseData){
            if(responseData){
                responseData = angular.fromJson(responseData);
                responseData.sales_date = (responseData.sales_date) ? new Date(responseData.sales_date + "T00:00:00") : null;
            }
            return RestService.transformResponse(responseData);
        }

        return $resource(resourceURI, {}, {
            'query': { method: 'GET', isArray: true, transformResponse: RestService.transformResponses},
            'get': {
                method: 'GET',
                url: resourceURI + '/',
                transformResponse: transformResponse
            },
            'update': {
                method: 'PUT',
                url: resourceURI + '/',
                params: {id: "@id"},
                transformRequest: transformRequest
            },
            'delete': {
                method: 'DELETE',
                url: resourceURI + '/',
                params: {id: "@id"}
            },
            'save': {
                method: 'POST',
                transformRequest: transformRequest
            },
            'check': {
                url: RestService.getURI() + 'sales/check',
                method: 'POST',
                transformRequest: transformRequest
            }
        });
    }

})(); 