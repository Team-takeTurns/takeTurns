'use strict';

(function() {

class weekViewController {

  constructor($http, $scope, socket, $rootScope) {
    this.$http = $http;
    this.awesomeEvents = [];

    $http.get('/api/events').then(response => {
      this.awesomeEvents = response.data;
      socket.syncUpdates('event', this.awesomeEvents);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('event');
    });
  }

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
  .controller('weekViewController', weekViewController);

})();
