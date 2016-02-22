'use strict';

(function() {

class EventCreatorController {

  constructor($http, $scope, socket,  $rootScope) {
    this.$http = $http;
    this.awesomeCalendars = [];
//----------------- liliya's vars ---------------------
console.log("$rootScope.userIDglobal  NEW EVENT"+ $rootScope.userIDglobal);
    this.calendar;
    this.userIDtemp ;
    this.user ;
     this.eventID ;
  //------------ liliya's vars end ----------------------

//------------------- liliya start: get calendar id from user ----------------------------
  paramSerializer: '$httpParamSerializerJQLike';

if (!$rootScope.userIDglobal){
  console.log("do nothing" );
 //  window.location = window.location + "/" +  $rootScope.userIDglobal;
}else{
    //  $rootScope.userIDglobal  = this.userIDtemp ;
}
    $http.get('/api/users/'+ $rootScope.userIDglobal).then(response => {
      this.user = response.data;
      this.getCalendar();
      socket.syncUpdates('calendar', this.calendar);
    });
            //---------------------- liliya end ---------------------------------


    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('calendar');
    });
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
  

  deleteEvent(event) {
  this.eventID = event._id;
    this.$http.patch('/api/calendars/' + this.calendar._id +"/deleteEvent/"+ this.eventID).then(response => {
      this.calendar = response.data;
    });
}

}

angular.module('takeTurnsApp')
  .controller('EventCreatorController', EventCreatorController);

})();
