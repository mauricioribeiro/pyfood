(function () {
    'use strict';

    angular.module('app.services')
        .service('OrderService', OrderService);

    /** @ngInject */
    function OrderService($resource, RestService) {

        var resourceURI = RestService.getURI() + 'orders/:id';

        function transformResponse(responseData){
            return RestService.transformResponse(responseData);
        }

        function transformArrayResponse(arrayResponseData){
            if(arrayResponseData){
                arrayResponseData = angular.fromJson(arrayResponseData);
                arrayResponseData.map(function(d){ return transformResponse(d) })
            }
            return arrayResponseData;
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
