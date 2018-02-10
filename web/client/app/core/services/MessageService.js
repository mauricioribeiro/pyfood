(function () {
    'use strict';

    angular.module('app.services')
        .service('MessageService', MessageService);

    /** @ngInject */
    function MessageService($resource, RestService) {

        var resourceURI = RestService.getURI() + 'messages/:id';

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
            'notifications': {
                method: 'GET',
                url: RestService.getURI() + 'messages/notifications/',
                transformResponse: transformArrayResponse,
                isArray: true
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
            'visualize': {
                method: 'PUT',
                url: RestService.getURI() + 'messages/notifications/',
                params: {id: "@id"},
                transformRequest: RestService.transformRequest
            },
        });
    }

})();
