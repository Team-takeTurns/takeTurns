'use strict';

(function() {

class CalEditorController {

  constructor($http, $scope, socket,  $cookies) {
    this.$http = $http;
    this.lengthsOfUrl = 52;
    this.calendar;
    this.message;
    this.adminEmail;
    this.calName;
    this.calDescription;
    this.membersTemp=[];
    this.memberName;
    this.memberEmail;
    this.url = window.location;
    this.collapseText = "Would you like to add a user?";
    this.user ;
    this.editCal = true;
    this.deleteFalse = true;
    this.memCounter;
    this.addMembers=[];
    this.delMembers=[];
    this.goodDate = new Date();

//get user id from url or from cookies ----------------------------
    paramSerializer: '$httpParamSerializerJQLike';

    if (this.url.toString().length ==  this.lengthsOfUrl ){
      console.log(" Setting userId in cookies in admin page " + this.url.toString().substr(28, 24));
      $cookies.put("userId", this.url.toString().substr(28, 24));
    } else {
    //  window.location = window.location + "/" +  $cookies.get("userId");
      console.log("In ADMIN page and url is less or greater than 52");
      console.log("this.url.toString().length " + this.url.toString().length);
      console.log("$cookies.get(userId) " + $cookies.get("userId"));
    }

//send request to BE to get user and then call function to get calendar 
    if ($cookies.get("userId")) {
        $http.get('/api/users/'+ $cookies.get("userId")).then(response => {
          this.user = response.data;
          if(this.user.role === "admin"){
            //Setting userRole and adminLink in cookies 
            console.log(" Setting userRole and adminLink in cookies in admin page " );
            $cookies.userRole = "admin";
            $cookies.adminLink = this.user.link.toString().substr(31, 31);
            //get calendar from BE
            this.getCalendar();

                  }else{
          console.log("display ERROR here search for: Liliya1111 in calEditor.controller");
          console.log("perhaps user is not admin!?");
          }
                      socket.syncUpdates('calendar', this.calendar);
    });
              }else {
          console.log("ERROR - userID is undefined. please use the link that was provided to you when the calendar was created.");
      }




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
    this.message = "You have successfully deleted the calendar. \n\nPlease disregard the links that were given to you. \n\nTo create a new calendar click on the logo above to go to home page.";
    this.deleteFalse = false;
  }

//cancel update - go back to view calendar
cancelUpdate(){
     this.editCal = true;
}

//send request to BE to update calendar details
 updateCalendar() {
      this.$http.put('/api/calendars/' + this.user.calID, { name: this.calName, description: this.calDescription, paramSerializer: '$httpParamSerializerJQLike'}).then(response => {
      this.calendar = response.data;
      this.updateAdminUser();
      this.updateMembers();
      this.message = "You have successfully edited the calendar.";
      alert(this.message);
      //this.deleteFalse = false; //opens another window to display the message
      this.editCal = true; // goes back to the calendar details view
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




//send request to BE to delete multiple events - temporarily here for testing - later code to be used to delete members
  updateMembers() {
  console.log(" i am in updateMembers method 1111111");
   console.log(" i am in updateMembers method 22222");
      console.log(" i am in updateMembers method this.calendar._id " + this.calendar._id);
         console.log(" i am in updateMembers method 33333");
          console.log(" i am in updateMembers method this.delMembers " + JSON.stringify(this.delMembers));
                   console.log(" i am in updateMembers method 4444444");
                             console.log(" i am in updateMembers method this.addMembers " + this.addMembers);
                                  console.log(" i am in updateMembers method 555555555555");
    this.$http.patch('/api/calendars/updateMembers/' + this.calendar._id , {delMembers: this.delMembers, addMembers: this.addMembers}).then(response => {
      this.calendar = response.data;
    });
}

//delete members from temporary 
deleteMember(member){
this.delMembers.add();
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
    console.log("this.addMembers.length " + this.addMembers.length)
    for(var i = 0; i < this.addMembers.length; i++){
      this.addMembers.push({name: this.memberName, email: this.memberEmail});
    }
   if(this.firstEntry==0){
    this.firstEntry = 1;
   }
    this.memCounter ++;
    this.memberName='';
    this.memberEmail='';
    this.currentGroup = this.memCounter;
    }
  }

  convertDate(isoDate){
    this.goodDate = Date(isoDate);
    return this.goodDate;
  }

}

angular.module('takeTurnsApp')
  .controller('CalEditorController', CalEditorController);

})();
