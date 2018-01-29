(function () {
    'use strict';

    angular.module('app', [
        // Core modules
         'app.core'

        // Custom Feature modules
        ,'app.chart'
        ,'app.ui'
        ,'app.ui.form'
        ,'app.ui.form.validation'
        ,'app.page'
        ,'app.table'
        ,'app.services'
        ,'app.interceptors'
        ,'app.events'
        ,'app.users'

        // 3rd party feature modules
        ,'md.data.table'
        ,'ngStorage'
        ,'ui.utils.masks'
    ]);

})();

