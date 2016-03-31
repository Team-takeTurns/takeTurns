'use strict';

(function() {

class CalEditorController {

  constructor($http, $scope, socket, $window, $cookies, $location, emailDataContainer) {
    this.$http = $http;
    this.$location = $location;
    this.$window = $window;
    this.emailDataContainer = emailDataContainer;
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


//just for testing for now
emailDataContainer.setBody("gggggggggggggggggg ");
console.log("4444444444444 " + emailDataContainer.getBody());
//just for testing for now


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


updateCalendarInfo(){
  this.updateAdminUser();
  this.updateCalendar();
}

//send request to BE to update calendar details
 updateCalendar() {
  console.log(" my temp members from client " + JSON.stringify(this.membersTemp));
      this.$http.put('/api/calendars/' + this.user.calID, { name: this.calName, description: this.calDescription, members: this.membersTemp, paramSerializer: '$httpParamSerializerJQLike'}).then(response => {
      this.calendar = response.data;
      this.message = "You have successfully edited the calendar.";
      alert(this.message);
      //this.deleteFalse = false; //opens another window to display the message
      this.editCal = true; // goes back to the calendar details view
    });
  }//members: this.membersTemp, 

//update admin email
updateAdminUser(){
    if(this.adminEmail){
      this.$http.put('/api/users/' + this.user._id, {email: this.adminEmail}).then(response => {
      this.user = response.data;
    });
  }
}

//delete members from temporary array
deleteMember(member){
      console.log("inside delete members " +  this.membersTemp);
   for (var i =0; i < this.membersTemp.length; i++){
      if (this.membersTemp[i].email === member.email) {
        this.membersTemp.splice(i,1);
        break;
      }
    }
}

//adding new members to temp array
 addMember(){
      console.log("inside add members" +  this.membersTemp);
  if(this.memberEmail && this.memberName){
    this.membersTemp.push({name: this.memberName, email: this.memberEmail});
    }
  }

convertDate(isoDate){
    this.goodDate = Date(isoDate);
    return this.goodDate;
  }

shareAdminLink(link){
  //before writing values to this service clear all values
  this.emailDataContainer.clearAll();
  this.emailDataContainer.setBody("The admin user for the " + this.calendar.name + " calendar Would like to share the following admin link with you: \n" + link + 
    "\nCalendar Info: " + "\nName: " + this.calendar.name + "\nDescription: " + this.calendar.description );
  this.emailDataContainer.setSubject("Admin link to the calendar '" + this.calendar.name +"'");
}

shareUserLink(link){
    //before writing values to this service clear all values
    this.emailDataContainer.clearAll();
   this.emailDataContainer.setBody("The admin user for the " + this.calendar.name + " calendar Would like to share the following link with you: \n" + link + 
    "\nCalendar Info: " + "\nName: " + this.calendar.name + "\nDescription: " + this.calendar.description );
  this.emailDataContainer.setSubject("Link to the calendar '" + this.calendar.name +"'");
}

}

angular.module('takeTurnsApp')
  .controller('CalEditorController', CalEditorController);

})();
