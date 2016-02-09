'use strict';

(function() {

<<<<<<< HEAD
    class EventViewerController {

        constructor($http, $scope, socket) {
            this.$http = $http;
            //----------------- liliya's vars ---------------------
            this.calendar;
            this.url = window.location;
            this.user;
            this.calendar;
            this.calendarDate;
            this.fool;
            this.userID = this.url.toString().substr(31, 24);
            console.log(" from event viewer user.id = " + this.userID);
            this.deleteCal = true;
            
            //------------ liliya's vars end ----------------------
            this.$scope = $scope;
            this.$scope.events = [];
            this.awesomeEvents = [];
            $scope.calendarView = 'day';
            $scope.calendarDate = new Date();

            $scope.events = [];

            //------------------- liliya start: get calendar id from user ----------------------------
            paramSerializer: '$httpParamSerializerJQLike';

            $http.get('/api/users/' + this.userID).then(response => {
                this.user = response.data;
                console.log(" i  am in calID" + this.user.calID);
                this.getCalendar();
                socket.syncUpdates('calendar', this.calendar);
            });
            //---------------------- liliya end ----------------------------------


            /* -------------- Christine are you using this? --- if not please  delete it
                $http.get('/api/events').then(response => {
                        console.log(" i  am in eventViewer.controller");
                  this.awesomeEvents = response.data;
                  socket.syncUpdates('event', this.awesomeEvents);
                });
              ---------------------------------------------------------------*/



            //---------------------- auto generated start ----------------------------------
            $scope.$on('$destroy', function() {
                socket.unsyncUpdates('event');
            });
            //---------------------- auto generated end ----------------------------------
        }


        //------------------------- liliya start: get calendar details -------------------------------
        getCalendar() {
            this.$http.get('/api/calendars/' + this.user.calID).then(response => {
                this.calendar = response.data;
                console.log("Calender object: " + this.calendar);
                this.dayEvents();
            });
        }
        //---------------------- liliya end ----------------------------------


        addEvent() {
            if (this.newEvent) {
                this.$http.post('/api/events', { name: this.newEvent });
                this.newEvent = '';
            }
        }

        deleteEvents(event) {
            this.$http.delete('/api/events/' + event._id);
        }

        anything() {
            console.log("works fine");
        }
        
        //---------------------------Francis Event Details Methods -------------------------
        detailsEvent(dayTitle) {

            for (var dayEvent in this.calendar.events) {
                if (this.calendar.events[dayEvent].title == dayTitle) {
                    this.$scope.christine = this.calendar.events[dayEvent];
                }
            }

        }
        //---------------------------Francis ends Event Details Methods----------------------
        
        //-------------------------------Christine Task ---------------------------------
        dayEvents() {
            console.log("dayEvents is called");
            for (var i in this.calendar.events) {
                var a = this.calendar.events[i].date;
                var b = new Date(a.substring(0, 10) + "T" + this.calendar.events[i].startTime);
                var c = new Date(a.substring(0, 10) + "T" + this.calendar.events[i].endTime);
                
                // Required to set the calenday months or day
                this.$scope.calendarView = 'day';
                this.$scope.calendarDate = new Date();

                this.$scope.events[i] =

                    {
                        title: this.calendar.events[i].title,
                        type: 'warning',
                        startsAt: new Date(moment(b).format()),
                        endsAt: new Date(moment(c).format()),
                        draggable: true,
                        resizable: true
                    };
            } // End The for loop
        } // End dayEvents method
        
        eventClicked(events) {
            console.log("You clicked: " + events.title);
            this.detailsEvent(events.title);
        }
        //-------------------------------End Christine Task ----------------------------------------
=======
class EventViewerController {
    
  constructor($http, $scope, socket) {
    this.$http = $http;
    //----------------- liliya's vars ---------------------
    this.calendar;
    this.url = window.location;
    this.user ;
    this.calendar;
    this.userID = this.url.toString().substr(31, 24);
    console.log(" from event viewer user.id = " +   this.userID );
    this.deleteCal = true;
  //------------ liliya's vars end ----------------------
  
  // ------------------Francis var -------------
  this.$scope = $scope;
  // ------------------Francis ends --------------
    this.awesomeEvents = [];
    $scope.calendarView = 'day';
    $scope.calendarDate = new Date();
    // $scope.events = [

    //   {
    //     title: 'THIS IS A TEST',
    //     type: 'warning',
    //     startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
    //     endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
    //     //endsAt: (2016, 2, 6, 3),
    //     draggable: true,
    //     resizable: true
    //   }
//];


//------------------- liliya start: get calendar id from user ----------------------------
  paramSerializer: '$httpParamSerializerJQLike';

    $http.get('/api/users/'+ this.userID).then(response => {
      this.user = response.data;
      console.log(" i  am in calID" +   this.user.calID);
      this.getCalendar();
      socket.syncUpdates('calendar', this.calendar);
    });
//---------------------- liliya end ----------------------------------


/* -------------- Christine are you using this? --- if not please  delete it
    $http.get('/api/events').then(response => {
            console.log(" i  am in eventViewer.controller");
      this.awesomeEvents = response.data;
      socket.syncUpdates('event', this.awesomeEvents);
    });
  ---------------------------------------------------------------*/



  //---------------------- auto generated start ----------------------------------
    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('event');
    });
      //---------------------- auto generated end ----------------------------------
  }


//------------------------- liliya start: get calendar details -------------------------------
  getCalendar(){
   this.$http.get('/api/calendars/'+ this.user.calID).then(response => {
      this.calendar = response.data;
      // ------------------Francis -------------------------
      //this.detailsEvent();
      // --------------------Francis ends ------------------
    });
  }
//---------------------- liliya end ----------------------------------


  addEvent() {
    if (this.newEvent) {
      this.$http.post('/api/events', { name: this.newEvent });
      this.newEvent = '';
>>>>>>> aae3081d6fe13c94eef7df9fa2c4b8bfaf841665
    }

<<<<<<< HEAD
    angular.module('takeTurnsApp')
        .controller('EventViewerController', EventViewerController);
=======
  deleteEvents(event) {
    this.$http.delete('/api/events/' + event._id);
  }
  
  //------------------------------Francis -----------------------------------
  private detailsEvent():void{
      this.$scope.selectedEvent = this.calendar.events[0];
  }
  //------------------------------End Francis --------------------------------
}

angular.module('takeTurnsApp')
  .controller('EventViewerController', EventViewerController);
>>>>>>> aae3081d6fe13c94eef7df9fa2c4b8bfaf841665

})();
