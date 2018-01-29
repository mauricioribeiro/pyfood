(function () {
    'use strict';

    angular.module('app')
        .controller('CalendarCtrl', ['$scope', '$filter', '$timeout', '$mdSidenav', 'ReceiptService', CalendarCtrl])

    function CalendarCtrl($scope, $filter, $timeout, $mdSidenav, ReceiptService) {

        $scope.loadFilter = loadFilter;
        $scope.openDay = openDay;
        $scope.eventCreate = eventCreate;
        $scope.openDetailsSidenav = openDetailsSidenav;
        $scope.openFilterSidenav = openFilterSidenav;
        $scope.closeDetailsSidenav = closeDetailsSidenav;
        $scope.closeFilterSidenav = closeFilterSidenav;

        $scope.events = [];
        $scope.selected = null;
        $scope.filter = {
            user_id: null,
            start_date: null,
            end_date: null
        };

        load();
        fixCalendar(3000); // TODO fix using css

        function load(){
            $scope.promise = ReceiptService.calendar($scope.filter, loadSuccess, loadError);
        }

        function loadFilter(){
            $scope.events = [];
            $scope.promise = ReceiptService.calendar($scope.filter, filterSuccess, loadError);
        }

        function fixCalendar(timeout){
            if(!timeout) timeout = 500;
            $timeout(function(){
                var calendarRows = angular.element('.md-event-calendar-month-row');
                var calendarDayHeight = (angular.element('md-event-calendar-month').height() - 36) / calendarRows.length;
                calendarRows.css('max-height', calendarDayHeight + 'px');
                calendarRows.css('height', calendarDayHeight + 'px');
            }, timeout);
        }

        function openDay(event){
            if(event) openDetailsSidenav(event);
        }

        function eventCreate(event){

        }

        function openDetailsSidenav(event){
            $scope.selected = event;
            $mdSidenav('calendar-details').open();
            fixCalendar();
        }

        function closeDetailsSidenav(){
            $scope.selected = null;
            $mdSidenav('calendar-details').close();
            fixCalendar();
        }

        function openFilterSidenav(){
            $mdSidenav('calendar-filter').open();
            fixCalendar();
        }

        function closeFilterSidenav(){
            $mdSidenav('calendar-filter').close();
            fixCalendar();
        }

        function filterSuccess(data){
            loadSuccess(data);
            closeFilterSidenav();
        }

        function loadSuccess(data){
            var groupByDay = {};

            data.forEach(function(data) {
                if(data.receipt_estimated_date && data.receipt_net_value){
                    data.sale_created_at = (data.sale_created_at) ? new Date(data.sale_created_at) : null;

                    if(!groupByDay[data.receipt_estimated_date]){
                        groupByDay[data.receipt_estimated_date] = {
                            date: new Date(data.receipt_estimated_date),
                            total: data.receipt_net_value,
                            items: []
                        }
                    } else {
                        groupByDay[data.receipt_estimated_date].total += data.receipt_net_value
                    }

                    groupByDay[data.receipt_estimated_date].items.push(data);
                }
            });

            for(var day in groupByDay){
                $scope.events.push({
                    title: $filter('currency')(groupByDay[day].total, 'R$ '),
                    start: groupByDay[day].date,
                    end: groupByDay[day].date,
                    items: groupByDay[day].items,
                    allDay: true
                });
            }
        }

        function loadError(data){
            console.log(data);
        }

    }


})(); 
