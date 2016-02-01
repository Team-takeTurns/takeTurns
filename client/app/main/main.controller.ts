'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.awesomeThings = [];
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

    this.membersTemp=[];

    $http.get('/api/calendars/').then(response => {
            console.log(" i  am in main.controller");
      this.awesomeThings = response.data;
      socket.syncUpdates('calendar', this.awesomeThings);
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
 if (this.Email && this.Name) {
      this.$http.post('/api/calendars', { users: [{role: "admin", email: this.Email}, {role: "active"}], dateCreated: new Date(), name: this.Name, description: this.Description, members: this.membersTemp,   paramSerializer: '$httpParamSerializerJQLike'}).then(response => {
      this.calendar = response.data;

      this.updateUserLinks();
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


updateUserLinks(){
    for (var d = 0, len = this.calendar.users.length; d < len; d += 1){
        if (this.calendar.users[d].role === "admin"){
            this.adminID = this.calendar.users[d]._id;
        }
    }
    for (var d = 0, len = this.calendar.users.length; d < len; d += 1){
        if (this.calendar.users[d].role === "active"){
            this.activeID = this.calendar.users[d]._id;
        }
    }

    this.adminLink = "http://localhost:9000/" + this.adminID;
    this.activeLink = "http://localhost:9000/" + this.activeID;
console.log("in new code adminID " + this.adminID);
console.log("in new code activeID " + this.activeID);
this.calendarUpdate();
}

calendarUpdate(){
  this.$http.put('/api/calendars/'+ this.calendar._id, { users: [{role: "admin", link: this.adminLink}, {role: "active", link: this.activeLink}], paramSerializer: '$httpParamSerializerJQLike'}).then(response => {
      this.calendar = response.data;
console.log("response after update " + this.calendar);
}
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

  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }


  }

angular.module('takeTurnsApp')
  .controller('MainController', MainController);

})();
