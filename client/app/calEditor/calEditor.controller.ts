'use strict';

(function() {

class CalEditorController {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.awesomeCalendars = [];

    $http.get('/api/calendars').then(response => {
            console.log(" i  am in calEditor.controller");
      this.awesomeCalendars = response.data;
      socket.syncUpdates('calendar', this.awesomeCalendars);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('calendar');
    });
  }

  addCalendar() {
    if (this.newCalendar) {
      this.$http.post('/api/calendars', { name: this.newCalendar });
      this.newCalendar = '';
    }
  }

  deleteCalendar(calendar) {
    this.$http.delete('/api/calendars/' + calendar._id);
  }
}

angular.module('takeTurnsApp')
  .controller('CalEditorController', CalEditorController);

})();
