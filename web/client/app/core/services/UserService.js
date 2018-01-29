(function () {
    'use strict';

    angular.module('app.services')
        .service('UserService', UserService);

    /** @ngInject */
    function UserService($resource, RestService) {

        var resourceURI = RestService.getURI() + 'users/:id';

        function transformResponse(responseData){
            if(responseData){
                responseData = angular.fromJson(responseData);
                if(responseData.owner && responseData.owner.proprietaries){
                    responseData.owner.proprietaries.map(function(p){
                        p.birth_date = (p.birth_date) ? new Date(p.birth_date + "T00:00:00") : null;
                        return p;
                    });
                }
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
            'getMyUser': {
                method: 'GET',
                url: RestService.getURI() + 'user',
                params: {},
                isArray: false,
                interceptor: {
                    response: function(response) {
                        // expose response
                        return response;
                    }
                }
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