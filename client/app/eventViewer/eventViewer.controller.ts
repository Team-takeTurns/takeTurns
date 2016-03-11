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
            this.eventStartTime = new Date();
            this.eventEndTime = new Date();
            this.eventDate = new Date();

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
                this.monthEvents();
                this.calendar.events.sort(this.sortByDatesTime);
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

                    this.eventStartTime = this.timeFormater(this.selectedEvent.date, this.selectedEvent.startTime);
                    this.eventEndTime = this.timeFormater(this.selectedEvent.date, this.selectedEvent.endTime);
                    this.eventDate = new Date(moment(this.selectedEvent.date).format());
                }
            }
        }
        
        /** Format the Time accepting two parameter
         * 1. Date of the time
         * 2. Time to be formated
         *  */
        private timeFormater(uDate, uTime) {
            var fDate = new Date(uDate.substring(0, 10) + "T" + uTime);

            return new Date(moment(fDate).format());
        }
        
        // Perform sort on the Events		
        private sortByDatesTime(date1, date2) {

            //Sort by date		
            if (date1.date > date2.date) return 1;
            if (date1.date < date2.date) return -1;
            //Sort By Time		
            if (date1.startTime > date2.startTime) return 1;
            if (date1.startTime < date2.startTime) return -1;
            return 0;
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
        deleteEvent() {
            //change view
            this.showEventDetailView = true;
            this.showEventDetailForm = true;
            //testing - debuging
            console.log("event Id   " + this.selectedEvent._id);
            console.log("event Id  outside if " + this.calendar._id); 
            //send request to delete event

            this.$http.patch('/api/calendars/' + this.calendar._id + "/DeleteEvent/" + this.selectedEvent._id).then(response => {
                //this.calendar = response.data;
                alert('Event successfully deleted from calendar at ' + new Date());
                //window.location.reload(true);
            });
        }


        dayEvents() {
            if (this.calendar.events.length == 0) {
                this.$scope.calendarView = 'day';
                this.$scope.calendarDateDay = new Date();
                console.log("HELLO ITS ME");
            }
            else {
                for (var i in this.calendar.events) {
                    var calEvent = this.calendar.events[i].date;
                    var startTime = new Date(calEvent.substring(0, 10) + "T" + this.calendar.events[i].startTime);
                    var endTime = new Date(calEvent.substring(0, 10) + "T" + this.calendar.events[i].endTime);
                
                    // Required to set the calendar months or day
                    this.$scope.calendarView = 'day';
                    this.$scope.calendarDateDay = new Date();

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

        updateEvent() {
            this.$http.put('/api/calendars/updateEvent/' + this.calendar._id, { eventId: this.selectedEvent._id, title: this.selectedEvent.title, host: this.selectedEvent.host, date: this.selectedEvent.date, startTime: this.selectedEvent.startTime, endTime: this.selectedEvent.endTime, info: this.selectedEvent.info, paramSerializer: '$httpParamSerializerJQLike' }).then(response => {
                console.log("9999999999999999999999999999999");
                this.calendar = response.data;

                this.message = "You have successfully edited the event.";
                alert(this.message);
                this.showEventDetailView = true;
                this.showEventDetailForm = true;
            });
        }



        cancelEdit() {
            this.showEventDetailView = true;
            this.showEventDetailForm = true;
        }



        monthEvents() {
            if (this.calendar.events.length == 0) {
                this.$scope.calendarViewMonth = 'month';
                this.$scope.calendarDateMonth = new Date();
                console.log("HELLO ITS THE MONTH VIEW");
            }
            else {
                for (var i in this.calendar.events) {
                    var calEvent = this.calendar.events[i].date;
                    var startTime = new Date(calEvent.substring(0, 10) + "T" + this.calendar.events[i].startTime);
                    var endTime = new Date(calEvent.substring(0, 10) + "T" + this.calendar.events[i].endTime);
                
                    // Required to set the calendar months or day
                    this.$scope.calendarViewMonth = 'month';
                    this.$scope.calendarDateMonth = new Date();
                    this.$scope.events[i] =
                        {
                            title: this.calendar.events[i].title,
                            startsAt: new Date(moment(startTime).format()),
                            endsAt: new Date(moment(endTime).format()),
                            eventId: this.calendar.events[i]._id
                        };
                }
            } // End The for loop
        } // End monthEvents method

    }


    angular.module('takeTurnsApp')
        .controller('EventViewerController', EventViewerController);
})();
