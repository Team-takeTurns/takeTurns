'use strict';

(function() {

    class weekViewController {

        constructor($http, $scope, socket, $rootScope) {
            this.$http = $http;
            this.awesomeEvents = [];

            this.calendar;
            this.url = window.location;
            this.user;
            this.$scope = $scope;
            this.$scope.slot = this.calendar;
            $scope.events = [];
            
            //get calendar id from user ----------------------------
            // paramSerializer: '$httpParamSerializerJQLike';

            // if (!this.userIDtemp) {
            //     console.log("do nothing");
            //     window.location = window.location + "/" + $rootScope.userIDglobal;
            // } else {
            //     $rootScope.userIDglobal = this.userIDtemp;
            // }
            // $http.get('/api/users/' + $rootScope.userIDglobal).then(response => {
            //     this.user = response.data;
            //     this.getWeekCalendar();
            //     socket.syncUpdates('week', this.calendar);
            // });
           
            //auto generated start ----------------------------------
            $scope.$on('$destroy', function() {
                socket.unsyncUpdates('week');
            });
            //auto generated end ----------------------------------
            
            this.weekEvents();

        }
        
        // // get calendar details -------------------------------
        // getWeekCalendar() {
        //     this.$http.get('/api/week/' + this.user.calID).then(response => {
        //         this.calendar = response.data;
        //         //this.detailsEvent(this.calendar.events[0]._id);
        //     });
        // }

        weekEvents() {

            // Required to set the calendar months or day
            // if (this.calendar.events.length == 0) {
            //     this.$scope.calendarView = 'week';
            //     this.$scope.calendarDate = new Date();
            //     console.log("CURRENTLY IN THE WEEK VIEW");
            // } else {
            //     for (var i in this.calendar.events) {
            //         var calEvent = this.calendar.events[i].date;
            //         var startTime = new Date(calEvent.substring(0, 10) + "T" + this.calendar.events[i].startTime);
            //         var endTime = new Date(calEvent.substring(0, 10) + "T" + this.calendar.events[i].endTime);

            this.$scope.calendarView = "week";
            this.$scope.calendarDate = new Date();

            // this.$scope.events[i] = {
            //     host: this.calendar.events[i].host,
            //     title: this.calendar.events[i].title,
            //     startsAt: new Date(moment(startTime).format()),
            //     endsAt: new Date(moment(endTime).format()),
            //     eventId: this.calendar.events[i]._id

            // };
        }
    }
    //     } // End The for loop
    // } // End dayEvents method


    // }

    angular.module('takeTurnsApp')
        .controller('weekViewController', weekViewController);

})();
