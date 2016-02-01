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
      this.$http.post('/api/calendars', { admin: {role: "admin", email: this.Email}, dateCreated: new Date(), name: this.Name, description: this.Description, members: this.membersTemp,   paramSerializer: '$httpParamSerializerJQLike'}).then(response => {
      this.calendar = response.data;
console.log(this.calendar);
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
