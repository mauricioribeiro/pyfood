(function () {
    'use strict';

    angular.module('app.services')
        .service('ReportService', ReportService);

    /** @ngInject */
    function ReportService($resource, $filter, RestService) {

        var resourceURI = RestService.getURI() + 'reports';

        function transformRequest(requestData){
            if(requestData){
                requestData.start_date = (requestData.start_date) ? $filter('date')(requestData.start_date, 'yyyy-MM-dd') : null;
                requestData.end_date = (requestData.end_date) ? $filter('date')(requestData.end_date, 'yyyy-MM-dd') : null;
            }
            return RestService.transformRequest(requestData);
        }

        function transformResponse(responseData){
            if(responseData){
                responseData = angular.fromJson(responseData);
                responseData.start_date = (responseData.start_date) ? new Date(responseData.start_date) : null;
                responseData.end_date = (responseData.end_date) ? new Date(responseData.end_date) : null;
            }
            return RestService.transformResponse(responseData);
        }

        return $resource(resourceURI, {}, {
            'generate': {
                url: resourceURI + '/generate',
                method: 'POST',
                transformRequest: transformRequest
            },
            'transactions': {
                url: resourceURI + '/transactions',
                method: 'POST',
                transformRequest: transformRequest
            },
            'sales': {
                url: resourceURI + '/sales',
                method: 'POST',
                transformRequest: transformRequest
            }
        });
    }

})(); 