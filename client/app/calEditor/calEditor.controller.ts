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
    this.message;
    this.adminEmail;
    this.calName;
    this.calDescription;
    this.membersTemp=[];
    this.memberName;
    this.memberEmail;
    this.url = window.location;
    this.collapseText = "Would you like to add a member?";
    this.user ;
    this.userIDtemp = this.url.toString().substr(28, 24);
    this.editCal = true;
    this.deleteFalse = true;
     this.memCounter;
  //------------ liliya's vars end ----------------------


//------------------- liliya start: get calendar id from user ----------------------------
  paramSerializer: '$httpParamSerializerJQLike';

if (!this.userIDtemp){
  console.log("do nothing" );
  window.location = window.location + "/" +  $rootScope.userIDglobal;
}else{
      $rootScope.userIDglobal  = this.userIDtemp ;
      console.log("$rootScope.userIDglobal 555 = " + $rootScope.userIDglobal);
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
       this.memCounter = this.calendar.members.length;
    });
  }
//---------------------- liliya end ----------------------------------

  addCalendar() {
    if (this.newCalendar) {
      this.$http.post('/api/calendars', { name: this.newCalendar });
      this.newCalendar = '';
    }
  }

editCalendar(){
    this.adminEmail = this.user.email;
    this.calName = this.calendar.name;
    this.calDescription = this.calendar.description;
    this.membersTemp = this.calendar.members;
    this.memberName;
    this.memberEmail;
    this.editCal = false;
}

  deleteCalendar() {
    this.$http.delete('/api/calendars/' + this.user.calID);
     this.message = "You have successfully deleted the calendar. \n\nPlease disregard the links that were given to you. \n\nTo create new calendar follow this link.";
    this.deleteFalse = false;
  }

cancelUpdate(){
     this.editCal = true;
}

 updateCalendar() {
      this.$http.put('/api/calendars/' + this.user.calID, { name: this.calName, description: this.calDescription,   paramSerializer: '$httpParamSerializerJQLike'}).then(response => {
      this.calendar = response.data;
      this.updateAdminUser();
       this.message = "";
    });
  }//members: this.membersTemp, 


updateAdminUser(){
console.log("$rootScope.userIDglobal = " + this.$rootScope.userIDglobal);
 this.$http.put('/api/users/' + this.$rootScope.userIDglobal, {email: this.adminEmail}).then(response => {
      this.user = response.data;
          });
}

deleteMember(member){
   for (var i =0; i < this.membersTemp.length; i++){
      if (this.membersTemp[i].email === member.email) {
        this.membersTemp.splice(i,1);
         this.memCounter --;

         if( this.memCounter === 0){
           this.currentGroup = "None";
         }else{
         this.currentGroup = this.memCounter;
         }
        break;
      }
    }
}

 addMember(){
  if(this.memberEmail && this.memberName){
   this.membersTemp.push({name: this.memberName, email: this.memberEmail});
   if(this.firstEntry==0){
   this.firstEntry = 1;
   }
    this.memCounter ++;
   this.memberName='';
   this.memberEmail='';
    this.currentGroup = this.memCounter;
    }
  }

}

angular.module('takeTurnsApp')
  .controller('CalEditorController', CalEditorController);

})();
