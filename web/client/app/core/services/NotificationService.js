(function () {
    'use strict';

    angular.module('app.services')
        .service('NotificationService', NotificationService);

    /** @ngInject */
    function NotificationService($location, $filter) {

        this.getNotificationModel = function(){
            return {
                text: "Isso é uma notificação",
                order: null,
                client: null
            }
        };

    }

})();
