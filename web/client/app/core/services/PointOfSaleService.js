(function () {
    'use strict';

    angular.module('app.services')
        .service('PointOfSaleService', PointOfSaleService);

    /** @ngInject */
    function PointOfSaleService($resource, $filter, RestService) {

        var resourceURI = RestService.getURI() + 'points-of-sale/:id';

        function transformRequest(requestData){
            if(requestData){
                requestData.due_date = (requestData.due_date) ? $filter('date')(requestData.due_date, 'yyyy-MM-dd') : null;
                requestData.cancellation_date = (requestData.cancellation_date) ? $filter('date')(requestData.cancellation_date, 'yyyy-MM-dd') : null;
            }
            return RestService.transformRequest(requestData);
        }

        function transformResponse(responseData){
            if(responseData){
                responseData = angular.fromJson(responseData);
                responseData.due_date = (responseData.due_date) ? new Date(responseData.due_date + "T00:00:00") : null;
                responseData.cancellation_date = (responseData.cancellation_date) ? new Date(responseData.cancellation_date + "T00:00:00") : null;
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
            }
        });
    }

})(); 