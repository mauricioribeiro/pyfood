(function () {
    'use strict';

    angular.module('app.services')
        .service('RestService', RestService);

    /** @ngInject */
    function RestService($location, $filter) {

        this.getURI = function(){
            return ($location.host().indexOf('localhost') !== -1) ? $location.protocol() + '://' + $location.host() + ':8000/api/' : 'http://api.pyfood.com.br/';
        };

        this.getDefaultDataList = function(){
            return { count: 0, data: [] }
        };

        this.getDefaultPagination = function(){
            return {
                page: 'Página',
                rowsPerPage: 'Itens por página',
                of: 'de'
            };
        };

        this.transformRequest = transformRequest;
        this.transformResponse = transformResponse;

        this.transformRequests = function(requestData){
            return requestData.map(function(d){ return transformRequest(d); });
        };

        this.transformResponses = function(responseData){
            return responseData.map(function(d){ return transformResponse(d); });
        };

        function transformRequest(requestData){
            if(requestData){
                requestData.created_on = (requestData.created_on) ? $filter('date')(requestData.created_on, 'yyyy-MM-dd HH:mm:ss') : null;
                requestData.updated_on = (requestData.updated_on) ? $filter('date')(requestData.updated_on, 'yyyy-MM-dd HH:mm:ss') : null;
            }
            return requestData;
        }

        function transformResponse(responseData){
            if(responseData){
                responseData = angular.fromJson(responseData);
                responseData.created_at = (responseData.created_at) ? new Date(responseData.created_at) : null;
                responseData.updated_at = (responseData.updated_at) ? new Date(responseData.updated_at) : null;
            }
            return responseData;
        }

    }

})();
