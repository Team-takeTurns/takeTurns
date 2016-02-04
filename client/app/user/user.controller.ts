'use strict';

(function() {

class UserController {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.user ;
    this.user = $scope.params;

 console.log("fffffffff   this.user  = " +   $scope.user._id);
  paramSerializer: '$httpParamSerializerJQLike';
   console.log("fffffffff scope = " + $scope._id);


    $http.get('/api/users').then(response => {
            console.log(" i  am in user.controller");
      this.user = response.data;
      console.log("fffffffff user = " + $scope);
      socket.syncUpdates('user', this.user);
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

  deleteUser(user) {
    this.$http.delete('/api/users/' + user._id);
  }
}

angular.module('takeTurnsApp')
  .controller('UserController', UserController);

})();
