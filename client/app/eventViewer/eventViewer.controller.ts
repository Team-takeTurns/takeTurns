'use strict';

(function() {

class EventViewerController {

  constructor($http, $scope, socket, $rootScope) {
    this.$http = $http;
    //----------------- Global vars ---------------------
    this.calendar;
    this.url = window.location;
    this.user ;
        //----------------- Liliya's code ---------------------
    if(! $rootScope.userIDglobal ){
	$rootScope.userIDglobal ;
    }
    if(! $rootScope.userRole){
      this.userIDtemp = this.url.toString().substr(31, 24);
    }else if ( $rootScope.userRole === "admin"){
      this.userIDtemp = this.url.toString().substr(32, 24);
    }
  //------------ liliya's vars end ----------------------
            this.$scope = $scope;
            this.$scope.slot = this.calendar;
            $scope.events = [];
            this.awesomeEvents = [];

            //----------------- Global vars END---------------------
            
//------------------- liliya start: get calendar id from user ----------------------------
  paramSerializer: '$httpParamSerializerJQLike';

if (!this.userIDtemp){
  console.log("do nothing" );
  window.location = window.location + "/" +  $rootScope.userIDglobal;
}else{
      $rootScope.userIDglobal  = this.userIDtemp ;
}
    $http.get('/api/users/'+ $rootScope.userIDglobal).then(response => {
      this.user = response.data;
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

//------------------------- liliya start: get calendar details -------------------------------
  getCalendar(){
   this.$http.get('/api/calendars/'+ this.user.calID).then(response => {
      this.calendar = response.data;
                this.dayEvents();
    });
  }
//---------------------- liliya end ----------------------------------

        dayEvents() {
            for (var i in this.calendar.events) {
                var calEvent = this.calendar.events[i].date;
                var startTime = new Date(calEvent.substring(0, 10) + "T" + this.calendar.events[i].startTime);
                var endTime = new Date(calEvent.substring(0, 10) + "T" + this.calendar.events[i].endTime);
                // Required to set the calenday months or day
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
            } // End The for loop
        } // End dayEvents method
        
        // detailsEvents methods
        private detailsEvent(dayTitle) {

            for (var dayEvent in this.calendar.events) {
                if (this.calendar.events[dayEvent]._id == dayTitle) {
                    this.$scope.selectedEvent = this.calendar.events[dayEvent];
                }
            }

        }

        eventClicked(events) {
            console.log("You clicked: " + events.eventId);
            this.detailsEvent(events.eventId);
        }


<<<<<<< HEAD
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
=======
>>>>>>> upstream/master
    }
    
    
    angular.module('takeTurnsApp')
        .controller('EventViewerController', EventViewerController);
})();
