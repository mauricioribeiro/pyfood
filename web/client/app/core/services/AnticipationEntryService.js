(function () {
    'use strict';

    angular.module('app.services')
        .service('AnticipationEntryService', AnticipationEntryService);

    /** @ngInject */
    function AnticipationEntryService($resource, $filter, RestService) {

        var resourceURI = RestService.getURI() + 'anticipation-entries/:id';

        function transformRequest(requestData){
            if(requestData){
                requestData.date = (requestData.date) ? $filter('date')(requestData.date, 'yyyy-MM-dd') : null;
                requestData.voucher_period_start = (requestData.voucher_period_start) ? $filter('date')(requestData.voucher_period_start, 'yyyy-MM-dd') : null;
                requestData.voucher_period_end = (requestData.voucher_period_end) ? $filter('date')(requestData.voucher_period_end, 'yyyy-MM-dd') : null;
            }
            return RestService.transformRequest(requestData);
        }

        function transformResponse(responseData){
            if(responseData){
                responseData = angular.fromJson(responseData);
                responseData.date = (responseData.date) ? new Date(responseData.date + "T00:00:00") : null;
                responseData.voucher_period_start = (responseData.voucher_period_start) ? new Date(responseData.voucher_period_start + "T00:00:00") : null;
                responseData.voucher_period_end = (responseData.voucher_period_end) ? new Date(responseData.voucher_period_end + "T00:00:00") : null;
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