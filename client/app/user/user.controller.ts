'use strict';

(function() {

class UserController {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.user ;
    this.calendar;
    this.url = window.location;
    this.userID = this.url.toString().substr(28, 24);


  paramSerializer: '$httpParamSerializerJQLike';


    $http.get('/api/users/'+ this.userID).then(response => {
      this.user = response.data;
      socket.syncUpdates('user', this.user);
      this.getCalendar();
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('user');
    });
  }

  addUser() {
    if (this.user) {
      this.$http.post('/api/users', { name: this.newCalendar });
      this.user = '';
    }
  }

  getCalendar(){
   this.$http.get('/api/calendars/'+ this.user.calID).then(response => {
      this.calendar = response.data;
      socket.syncUpdates('calendar', this.calendar);
    });
  }

  deleteUser(user) {
    this.$http.delete('/api/users/' + user._id);
  }
}

angular.module('takeTurnsApp')
  .controller('UserController', UserController);
})();
