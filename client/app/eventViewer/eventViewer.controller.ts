'use strict';

(function() {

    class EventViewerController {

        constructor($http, $scope, socket, $rootScope) {
            this.$http = $http;
            //----------------- Global vars ---------------------
            this.calendar;
            this.url = window.location;
            this.user;
            this.selectedEvent;
            this.showEventDetailView = true;
            this.showEventDetailForm = true;
            this.message;

            //check if $rootScope.userIDglobal is undefined then define it else  
            if (!$rootScope.userIDglobal) {
                $rootScope.userIDglobal;
            }
            if (!$rootScope.userRole) {
                this.userIDtemp = this.url.toString().substr(31, 24);
            } else if ($rootScope.userRole === "admin") {
                this.userIDtemp = this.url.toString().substr(32, 24);
            }
            this.$scope = $scope;
            this.$scope.slot = this.calendar;
            $scope.events = [];
            this.awesomeEvents = [];

            //----------------- Global vars END---------------------
            
            //get calendar id from user ----------------------------
            paramSerializer: '$httpParamSerializerJQLike';

            if (!this.userIDtemp) {
                console.log("do nothing");
                window.location = window.location + "/" + $rootScope.userIDglobal;
            } else {
                $rootScope.userIDglobal = this.userIDtemp;
            }
            $http.get('/api/users/' + $rootScope.userIDglobal).then(response => {
                this.user = response.data;
                this.getCalendar();
                socket.syncUpdates('calendar', this.calendar);
            });
           

            //auto generated start ----------------------------------
            $scope.$on('$destroy', function() {
                socket.unsyncUpdates('calendar');
            });
            //auto generated end ----------------------------------
        }

        // get calendar details -------------------------------
        getCalendar() {
            this.$http.get('/api/calendars/' + this.user.calID).then(response => {
                this.calendar = response.data;
                this.dayEvents();
                this.detailsEvent(this.calendar.events[0]._id);
            });
        }
        

        // dayEvents() {
        //     for (var i in this.calendar.events) {
        //         var calEvent = this.calendar.events[i].date;
        //         var startTime = new Date(calEvent.substring(0, 10) + "T" + this.calendar.events[i].startTime);
        //         var endTime = new Date(calEvent.substring(0, 10) + "T" + this.calendar.events[i].endTime);
        //         // Required to set the calenday months or day
        //         this.$scope.calendarView = 'day';
        //         this.$scope.calendarDate = new Date();

        //         console.log("ID:" + this.calendar.events[i]._id);
        //         this.$scope.events[i] =
        //             {
        //                 title: this.calendar.events[i].title,
        //                 startsAt: new Date(moment(startTime).format()),
        //                 endsAt: new Date(moment(endTime).format()),
        //                 eventId: this.calendar.events[i]._id
        //             };
        //     } // End The for loop
        // } // End dayEvents method
        
        // detailsEvents methods
        private detailsEvent(dayTitle) {

            for (var dayEvent in this.calendar.events) {
                if (this.calendar.events[dayEvent]._id == dayTitle) {
                    this.selectedEvent = this.calendar.events[dayEvent];
                }
            }

        }
        
        // Listen for the Event Clicked
        eventClicked(events) {
            this.detailsEvent(events.eventId);
        }
        
        // Change the view of the event details
        public switchEventDetailView(buttonClicked: number) {

            switch (buttonClicked) {
                case 0:
                    this.showEventDetailView = false;
                    this.showEventDetailForm = false;
                    break;
                case 1:
                    this.showEventDetailView = true;
                    this.showEventDetailForm = true;
                    break;
            }
        }

//code to delete an event
            deleteEvent(){
            //change view
                this.showEventDetailView = true;
                this.showEventDetailForm = true;
            //testing - debuging
                console.log("event Id   " +  this.selectedEvent._id);
                console.log("event Id  outside if " + this.calendar._id); 
            //send request to delete event
              // this.$http.patch('/api/calendars/' + this.calendar._id +"/DeleteEvent/"+ this.selectedEvent._id).then(response => {
              this.$http.patch('/api/calendars/' + "56b1e6924f07f3840f8ce514" +"/DeleteEvent/"+ "56c931132a65e1c81f986c14").then(response => {
                 //this.calendar = response.data;
                 // this.message('Event deleted');
                  alert('Event successfully deleted from calendar at ' + Date());
                  //window.location.reload(true);
                });
            }

        dayEvents() {
            if (this.calendar.events.length == 0) {
                this.$scope.calendarView = 'day';
                this.$scope.calendarDate = new Date();
                console.log("HELLO ITS ME");
            }
            else {
                for (var i in this.calendar.events) {
                    var calEvent = this.calendar.events[i].date;
                    var startTime = new Date(calEvent.substring(0, 10) + "T" + this.calendar.events[i].startTime);
                    var endTime = new Date(calEvent.substring(0, 10) + "T" + this.calendar.events[i].endTime);
                
                    // Required to set the calendar months or day
                    this.$scope.calendarView = 'day';
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
