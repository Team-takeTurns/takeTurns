'use strict';

(function() {

class EventViewerController {

  constructor($http, $scope, socket) {
    this.$http = $http;
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
];

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
