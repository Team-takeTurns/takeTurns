'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.awesomeThings = [];

    $http.get('/api/things').then(response => {
            console.log(" i  am in main.controller");
      this.awesomeThings = response.data;
      socket.syncUpdates('thing', this.awesomeThings);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }

  addCalendar() {
    if (this.Email && this.Title) {
      this.$http.post('/api/calendars', { email: this.Email, dateCreated: new Date(), title: this.Title, description: this.Description });
      this.Description = '';
      this.Title = '';
      this.Email = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }
}

angular.module('takeTurnsApp')
  .controller('MainController', MainController);

})();
