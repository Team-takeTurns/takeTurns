'use strict';

(function() {

class EventCreatorController {

  constructor($http, $scope, socket,  $rootScope) {
    this.$http = $http;
    this.awesomeCalendars = [];
//----------------- liliya's vars ---------------------
    this.calendar;
    this.user ;
  //------------ liliya's vars end ----------------------


    $http.get('/api/calendars').then(response => {
      this.awesomeCalendars = response.data;
      socket.syncUpdates('calendar', this.awesomeCalendars);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('calendar');
    });
  }

  addEvent() {
    if (this.newEvent) {
      this.$http.post('/api/events', { name: this.newEvent });
      this.newEvent = '';
    }
  }

  deleteCalendar(calendar) {
    this.$http.delete('/api/calendars/' + calendar._id);
  }
}

angular.module('takeTurnsApp')
  .controller('EventCreatorController', EventCreatorController);

})();
