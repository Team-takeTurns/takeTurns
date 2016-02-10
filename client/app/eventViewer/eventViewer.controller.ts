'use strict';

(function() {

class EventViewerController {

  constructor($http, $scope, socket, $rootScope) {
    this.$http = $http;
    //----------------- liliya's vars ---------------------
    this.url = window.location;
    this.calendar;
    this.user ;
    if(! $rootScope.userIDglobal ){
      $rootScope.userIDglobal ;
    }
    if(! $rootScope.userRole){
      this.userIDtemp = this.url.toString().substr(31, 24);
    }else if ( $rootScope.userRole === "admin"){
      this.userIDtemp = this.url.toString().substr(32, 24);
    }
  //------------ liliya's vars end ----------------------


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
}

angular.module('takeTurnsApp')
  .controller('EventViewerController', EventViewerController);

})();
