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
            this.nxtDay = 0;
            this.backUpEventSelected;
            this.backUpEventStartTime;
            this.backUpEventEndTime;
            this.backUpEventDate;

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
                this.detailsEvent(this.calendar.events[this.getIndexOfFirstEventByDay()]._id);
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
        private detailsEvent(eventId) {

            for (var dayEvent in this.calendar.events) {
                if (this.calendar.events[dayEvent]._id == eventId) {
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

        // Return the index of the first event
        private getIndexOfFirstEventByDay() {
            var myIndex = 0;
            var firstTime = 24;
            var count = 0;
            var currentDate = new Date();
            var month = "" + (currentDate.getMonth() + 1);
            var day = "" + (currentDate.getDate() + this.nxtDay);
            var uEvents = this.calendar.events;

            if (month.length < 2) {
                month = "0" + month;
            }
            if (day.length < 2) {
                day = "0" + day;
            }

            uEvents.forEach(element => {
                // Check if the element is of current month and date
                if (element.date.substring(5, 7) == month && element.date.substring(8, 10) == day) {
                    if (element.startTime.substring(0, 2) < firstTime) {
                        firstTime = element.startTime.substring(0, 2);
                        myIndex = count;
                    }
                }
                count++;
            });
            return myIndex;
        }
        
        // Listen for the Event Clicked
        eventClicked(events) {
            this.detailsEvent(events.eventId);
        }
        
        // On the view button < or > clicked
        dayNavButtonClicked(clickedArrow: number) {
            if (clickedArrow != 0) {
                this.nxtDay += clickedArrow;
            } else {
                this.nxtDay *= clickedArrow;
            }

            this.detailsEvent(this.calendar.events[this.getIndexOfFirstEventByDay()]._id);
        }
        
        //Hide Event Detail View
        public hideEventView(buttonClicked: number) {
            this.backUpEventSelected = angular.copy(this.selectedEvent);
            this.backUpEventStartTime = angular.copy(this.eventStartTime);
            this.backUpEventEndTime = angular.copy(this.eventEndTime);
            this.backUpEventDate = angular.copy(this.eventDate);
            
            this.switchEventDetailView(buttonClicked);
        }
        
        // Change the view of the event details
        private switchEventDetailView(buttonClicked: number) {

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
        deleteEvent(buttonClicked: number) {
            
            // console.log("event Id   " + this.selectedEvent._id);
            // console.log("event Id  outside if " + this.calendar._id); 
            
            //send request to delete event
            this.$http.patch('/api/calendars/' + this.calendar._id + "/DeleteEvent/" + this.selectedEvent._id).then(response => {
                //this.$http.patch('/api/calendars/' + "56b1e6924f07f3840f8ce556" +"/DeleteEvent/"+ "56d2a6889cd26ad42860051e").then(response => {
                this.calendar = response.data;
                this.detailsEvent(this.calendar.events[this.getIndexOfFirstEventByDay()]._id);

                alert('Event successfully deleted from calendar at ' + new Date());
                //window.location.reload(true);
            });

            this.switchEventDetailView(buttonClicked);
        }


        dayEvents() {
            if (this.calendar.events.length == 0) {
                this.$scope.calendarView = 'day';
                this.$scope.calendarDateDay = new Date();
            }
            else {
                for (var i in this.calendar.events) {
                    var calEvent = this.calendar.events[i].date;
                    var startTime = new Date(calEvent.substring(0, 10) + "T" + this.calendar.events[i].startTime);
                    var endTime = new Date(calEvent.substring(0, 10) + "T" + this.calendar.events[i].endTime);
                
                    // Required to set the calendar months or day
                    this.$scope.calendarView = 'day';
                    this.$scope.calendarDateDay = new Date();

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
        
        // Update Events
        updateEvent(buttonClicked: number) {
            this.$http.put('/api/calendars/updateEvent/' + this.calendar._id, { eventId: this.selectedEvent._id, title: this.selectedEvent.title, host: this.selectedEvent.host, date: this.selectedEvent.date, startTime: this.selectedEvent.startTime, endTime: this.selectedEvent.endTime, info: this.selectedEvent.info, paramSerializer: '$httpParamSerializerJQLike' }).then(response => {

                this.calendar = response.data;
                this.detailsEvent(this.calendar.events[this.getIndexOfFirstEventByDay()]._id);

                alert("You have successfully edited the event.");
            });
            this.switchEventDetailView(buttonClicked);
        }
        
        // Cancel Update
        cancelEdit(buttonClicked: number) {
            this.selectedEvent = this.backUpEventSelected;
            this.selectedEvent = this.backUpEventSelected;
            this.eventStartTime = this.backUpEventStartTime;
            this.eventEndTime = this.backUpEventEndTime;
            this.eventDate = this.backUpEventDate;
            
            this.switchEventDetailView(buttonClicked);
        }



        monthEvents() {
            if (this.calendar.events.length == 0) {
                this.$scope.calendarViewMonth = 'month';
                this.$scope.calendarDateMonth = new Date();
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
