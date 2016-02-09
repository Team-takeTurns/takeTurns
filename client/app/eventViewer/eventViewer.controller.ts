'use strict';

(function() {

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
    }
  }

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

})();
