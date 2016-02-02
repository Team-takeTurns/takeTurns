'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.awesomeUsers = [];
    this.currentGroup = "None";
    this.memCounter=0;
    this.collapseText = "Would you like to add a group?";
    this.firstEntry = 0;
    this.Name = '';
    this.Email = '';
    this.jsonData=[];
    this.objectToSerialize=[];
    this.sendEmail = false;
    this.mainDiv=true;
    this.calendar;
    this.role="";
    this.d;
    this.len;
    this.adminLink;
    this.activeLink;
    this.adminUser;
    this.activeUser;
    this.id;
    this.user;
    this.adminEmail;

    this.membersTemp=[];

    $http.get('/api/users').then(response => {

            console.log(" window.location" +window.location.href);
      this.user = response.data;
      socket.syncUpdates('cinside get ', this.user);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('calendar');
    }); 
  }

  changeCollapseBtn(){
  if(this.collapseText == "Would you like to add a group?"){
  this.collapseText = "Collapse subform!";
  }
 else if( this.collapseText == "Collapse subform!"){
  this.collapseText = "Would you like to add a group?";
  }
  }

  addCalendar() {
  this.adminEmail = this.Email;
 if (this.Email && this.Name) {
      this.$http.post('/api/calendars', { dateCreated: new Date(), name: this.Name, description: this.Description, members: this.membersTemp,   paramSerializer: '$httpParamSerializerJQLike'}).then(response => {
      this.calendar = response.data;
      this.createAdminUser();
      this.createActiveUser();
    });
      if(this.sendEmail){
        console.log("checked" + this.sendEmail);
        console.log("main.controller from client. function name = addCalendar()" );
        console.log("add method here to send email to all members. Also will need the list of members to whome send the email.");
        console.log(" array that holds all emails is called this.membersTemp" + this.membersTemp);
      }
    this.resetAddCalFields();
    this.mainDiv=false;
    }
  }

createAdminUser(){
console.log("this.adminEmail " + this.adminEmail);
this.$http.post('/api/users' , {role: "admin", email: this.adminEmail, calID: this.calendar._id }).then(response => {
      this.adminUser = response.data;
      this.createAdminLink();
    });
}

createActiveUser(){
this.$http.post('/api/users' , {role: "active", calID: this.calendar._id }).then(response => {
      this.activeUser = response.data;
      this.createActiveLink();
    });
}

createAdminLink(){
             this.adminLink = "http://localhost:9000/users/" + this.adminUser._id;
             console.log("in new code adminLink " + this.adminLink);
             this.adminUserUpdate();
    }
createActiveLink(){
             this.activeLink = "http://localhost:9000/users/" + this.activeUser._id;
             console.log("in new code activeLink " + this.activeLink);
             this.activeUserUpdate();
        }

adminUserUpdate(){
  this.$http.put('/api/users/'+ this.adminUser._id, { link: this.adminLink}).then(response => {
      this.adminUser = response.data;
      });
console.log("response after update " + this.adminUser.link);
}

activeUserUpdate(){
  this.$http.put('/api/users/'+ this.activeUser._id, {link: this.activeLink}).then(response => {
      this.activeUser = response.data;
      });
console.log("response after update " + this.activeUser.link);
}


resetAddCalFields(){
      this.memCounter=0;
      this.currentGroup = "None";
      this.sendEmail = false;
      this.membersTemp = [];
      this.Description = '';
      this.Name = '';
      this.Email = '';
}

  addMember(){
  if(this.memEmail && this.memName){
   this.membersTemp.push({name: this.memName, email: this.memEmail});
   if(this.firstEntry==0){
   this.firstEntry = 1;
   }
    this.memCounter ++;
   this.memName='';
   this.memEmail='';
    this.currentGroup = this.memCounter;
   console.log(this.membersTemp);
    }
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
       console.log(this.membersTemp);
}

  deleteUser(user) {
    this.$http.delete('/api/users/' + user._id);
  }


  }

angular.module('takeTurnsApp')
  .controller('MainController', MainController);

})();
