(function () {
    'use strict';

    angular.module('app.events')
        .run(UnauthorizedEvent);

    function UnauthorizedEvent($rootScope, $location, $window) {
        $rootScope.$on('unauthorized', function() {
//            if($location.path() !== '/login'){
//                $window.location.href = ($location.host().indexOf('localhost') !== -1) ? 'http://localhost:3000/#!/login' : 'http://app.pyfood.com.br/#!/login';
//            }
        });
    }
})();
