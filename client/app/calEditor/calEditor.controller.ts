'use strict';

(function() {

class CalEditorController {

  constructor($http, $scope, socket) {
    this.$http = $http;
//----------------- liliya's vars ---------------------
    this.calendar;
    this.url = window.location;
    this.user ;
    this.calendar;
    this.userID = this.url.toString().substr(38, 24);
    this.deleteCal = true;
  //------------ liliya's vars end ----------------------


//------------------- liliya start: get calendar id from user ----------------------------
  paramSerializer: '$httpParamSerializerJQLike';

    $http.get('/api/users/'+ this.userID).then(response => {
      this.user = response.data;
      console.log(" i  am in calID" +   this.user.calID);
      this.getCalendar();
      socket.syncUpdates('calendar', this.calendar);
    });
//---------------------- liliya end ----------------------------------

//---------------------- auto generated end ----------------------------------
    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('calendar');
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
