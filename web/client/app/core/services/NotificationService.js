(function () {
    'use strict';

    angular.module('app.services')
        .service('NotificationService', NotificationService);

    /** @ngInject */
    function NotificationService($location, $filter) {

        var socket = new WebSocket('ws://localhost:8000/notifications/');

        socket.onopen = function open() {
          console.log('WebSockets connection created.');
        };

        socket.onmessage = function message(event) {
            var data = JSON.parse(event.data);
            console.log(data);
        };

        if (socket.readyState == WebSocket.OPEN) {
          socket.onopen();
        }

        this.getNotificationModel = function(){
            return {
                text: "Isso é uma notificação",
                order: null,
                client: null
            }
        };

    }

})();
