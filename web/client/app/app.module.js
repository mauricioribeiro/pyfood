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
        ,'app.profiles'
        ,'app.permissions'
        ,'app.flags'
        // ,'app.payment_methods'
        ,'app.voucher_products'
        ,'app.operators'
        ,'app.taxes'
        ,'app.sales'
        ,'app.banks'
        ,'app.pointsOfSale'
        ,'app.anticipationEntries'

        // 3rd party feature modules
        ,'md.data.table'
        ,'ngStorage'
        ,'material.components.eventCalendar'
        ,'ui.utils.masks'
    ]);

})();

