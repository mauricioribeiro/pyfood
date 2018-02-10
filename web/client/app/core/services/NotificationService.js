(function () {
    'use strict';

    angular.module('app.services')
        .service('NotificationService', NotificationService);

    /** @ngInject */
    function NotificationService($location, $filter) {
        var socket = null;
        var receiveCallback = null;
        var tune = new Audio("http://localhost:3000/assets/notification.mp3");

        this.setReceiveCallback = function(callback){
            receiveCallback = callback;
        };

        this.connect = function(){
            socket = new WebSocket('ws://localhost:8000/notifications/');

            socket.onopen = function open() {
              console.log('WebSockets connection created.');
            };

            socket.onerror = function open() {
              console.log('WebSockets connection got an error.');
            };

            socket.onmessage = function message(event) {
                var notification = JSON.parse(event.data);
                if(typeof receiveCallback == 'function'){
                    receiveCallback(notification);
                    tune.play();
                } else {
                    console.log(notification);
                }
            };

            if (socket.readyState == WebSocket.OPEN) {
              socket.onopen();
            }
        }

    }

})();
