'use strict';

(function() {

    class EventViewerController {

        constructor($http, $scope, socket) {
            this.$http = $http;
            //----------------- Global vars ---------------------
            this.calendar;
            this.url = window.location;
            this.user;
            this.userID = this.url.toString().substr(31, 24);
            console.log(" from event viewer user.id = " + this.userID);
            this.deleteCal = true;

            this.$scope = $scope;
            this.$scope.slot = this.calendar;

            $scope.events = [];
            this.awesomeEvents = [];
            
            //----------------- Global vars END---------------------              

        //------------------- liliya start: get calendar id from user ----------------------------
        paramSerializer: '$httpParamSerializerJQLike';

        $http.get('/api/users/' + this.userID).then(response => {
            this.user = response.data;
            console.log(" i  am in calID" + this.user.calID);
            this.getCalendar();
            socket.syncUpdates('calendar', this.calendar);
        });
        //---------------------- liliya end ---------------------------------

        //---------------------- auto generated start ----------------------------------
        $scope.$on('$destroy', function() {
            socket.unsyncUpdates('event');
        });
        //---------------------- auto generated end ----------------------------------
    }
    
    getCalendar() {
        this.$http.get('/api/calendars/' + this.user.calID).then(response => {
            this.calendar = response.data;
            this.dayEvents();
            
        });
    }

    dayEvents() {
        if(this.calendar.events.length == 0){
            this.$scope.calendarView = 'month';
            this.$scope.calendarDate = new Date();
            console.log("HELLO ITS ME");
        }
        else{
        for (var i in this.calendar.events) {
            var calEvent = this.calendar.events[i].date;
            var startTime = new Date(calEvent.substring(0, 10) + "T" + this.calendar.events[i].startTime);
            var endTime = new Date(calEvent.substring(0, 10) + "T" + this.calendar.events[i].endTime);
                
            // Required to set the calenday months or day
            this.$scope.calendarView = 'month';
            this.$scope.calendarDate = new Date();
            
            console.log("ID:" + this.calendar.events[i]._id);
            this.$scope.events[i] =
                {
                    title: this.calendar.events[i].title,
                    startsAt: new Date(moment(startTime).format()),
                    endsAt: new Date(moment(endTime).format()),
                    eventId: this.calendar.events[i]._id
                };
        }
        } // End The for loop
    } // End dayEvents method
    }
    angular.module('takeTurnsApp')
        .controller('EventViewerController', EventViewerController);

})();
