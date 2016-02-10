'use strict';

(function() {

class CalEditorController {

  constructor($http, $scope, socket,  $rootScope) {
    this.$http = $http;
//----------------- liliya's vars ---------------------
    $rootScope.userIDglobal ;
    $rootScope.adminLink;
    $rootScope.userRole;
    this.calendar;
    this.url = window.location;
    this.user ;
    this.userIDtemp = this.url.toString().substr(28, 24);
    this.deleteCal = true;
  //------------ liliya's vars end ----------------------


//------------------- liliya start: get calendar id from user ----------------------------
  paramSerializer: '$httpParamSerializerJQLike';

if (!this.userIDtemp){
  console.log("do nothing" );
  window.location = window.location + "/" +  $rootScope.userIDglobal;
}else{
      $rootScope.userIDglobal  = this.userIDtemp ;
}
    $http.get('/api/users/'+ $rootScope.userIDglobal).then(response => {
      this.user = response.data;
      if(this.user.role === "admin"){
      $rootScope.userRole = "admin";
      $rootScope.adminLink = this.user.link.toString().substr(31, 31);
      this.getCalendar();
      }else{
      console.log("display ERROR here search for: Liliya1111 in calEditor.controller");
      }
      socket.syncUpdates('calendar', this.calendar);
    });
//---------------------- liliya end ----------------------------------

//---------------------- auto generated start ----------------------------------
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
