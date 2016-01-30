'use strict';

(function() {

class EventViewerController {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.awesomeEvents = [];

    $http.get('/api/events').then(response => {
            console.log(" i  am in eventViewer.controller");
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
  .controller('EventViewerController', EventViewerController);

})();
