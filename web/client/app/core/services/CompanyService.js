(function () {
    'use strict';

    angular.module('app.services')
        .service('CompanyService', CompanyService);

    /** @ngInject */
    function CompanyService($resource, $filter, RestService) {

        var resourceURI = RestService.getURI() + 'companies/:id';

        function transformRequest(requestData){
            if(requestData){
                if(requestData.proprietaries){
                    requestData.proprietaries.map(function(p){
                        p.birth_date = (p.birth_date) ? $filter('date')(p.birth_date, 'yyyy-MM-dd') : null;
                        return p;
                    });
                }
            }
            return RestService.transformRequest(requestData);
        }

        function transformResponse(responseData){
            if(responseData){
                responseData = angular.fromJson(responseData);
                if(responseData.proprietaries){
                    responseData.proprietaries.map(function(p){
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