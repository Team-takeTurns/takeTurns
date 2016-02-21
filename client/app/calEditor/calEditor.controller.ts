'use strict';

(function() {

class CalEditorController {

  constructor($http, $scope, socket,  $rootScope) {
    this.$http = $http;
    //check if $rootScope.userIDglobal is defined else define it
 if(! $rootScope.userIDglobal ){
  $rootScope.userIDglobal ;
    }
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
    this.addMembers=[];


//get calendar id from user ----------------------------
  paramSerializer: '$httpParamSerializerJQLike';
if (!this.userIDtemp){
  console.log("do nothing" );
  window.location = window.location + "/" +  $rootScope.userIDglobal;
}else{
      $rootScope.userIDglobal  = this.userIDtemp ;
      console.log("$rootScope.userIDglobal 555 = " + $rootScope.userIDglobal);
}

//send request to BE to get user and then call function to get calendar 
    $http.get('/api/users/'+ $rootScope.userIDglobal).then(response => {
      this.user = response.data;
      if(this.user.role === "admin"){
      $rootScope.userRole = "admin";
      $rootScope.adminLink = this.user.link.toString().substr(31, 31);
      //get calendar from BE
      this.getCalendar();
      }else{
      console.log("display ERROR here search for: Liliya1111 in calEditor.controller");
      }
      socket.syncUpdates('calendar', this.calendar);
    });


//---------------------- auto generated start ----------------------------------
    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('calendar');
    });
    //---------------------- auto generated end ----------------------------------
  }


// send request to get calendar from BE -------------------------------
  getCalendar(){
   this.$http.get('/api/calendars/'+ this.user.calID).then(response => {
      this.calendar = response.data;
       this.memCounter = this.calendar.members.length;
    });
  }

/*
//send request to BE to create new calendar
  addCalendar() {
    if (this.newCalendar) {
      this.$http.post('/api/calendars', { name: this.newCalendar });
      this.newCalendar = '';
    }
  }
*/

// assigning and defining some variables 
editCalendar(){
    this.adminEmail = this.user.email;
    this.calName = this.calendar.name;
    this.calDescription = this.calendar.description;
    this.membersTemp = this.calendar.members;
    this.memberName;
    this.memberEmail;
    this.editCal = false;
}


//send request to BE to delete calendar
  deleteCalendar() {
    this.$http.delete('/api/calendars/' + this.user.calID);
     this.message = "You have successfully deleted the calendar. \n\nPlease disregard the links that were given to you. \n\nTo create new calendar follow this link.";
    this.deleteFalse = false;
  }

//cancel update - go back to view calendar
cancelUpdate(){
     this.editCal = true;
}

//send request to BE to update calendar details
 updateCalendar() {
      this.$http.put('/api/calendars/' + this.user.calID, { name: this.calName, description: this.calDescription, members: this.newMembers,   paramSerializer: '$httpParamSerializerJQLike'}).then(response => {
      this.calendar = response.data;
       this.updateAdminUser();
       this.message = "You have successfully edited the calendar.";
          this.deleteFalse = false;
    });
  }//members: this.membersTemp, 

//update admin email
updateAdminUser(){
console.log("$rootScope.userIDglobal 888 = " + this.user._id);
if(this.adminEmail){
 this.$http.put('/api/users/' + this.user._id, {email: this.adminEmail}).then(response => {
      this.user = response.data;
          });
}
}

//delete members from temporary 
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

//adding new members
 addMember(){
  if(this.memberEmail && this.memberName){
   this.membersTemp.push({name: this.memberName, email: this.memberEmail});
   this.newMembers.push({name: this.memberName, email: this.memberEmail});
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
