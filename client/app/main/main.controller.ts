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

    this.membersTemp=[];

    $http.get('/api/things').then(response => {
            console.log(" i  am in main.controller");
      this.awesomeThings = response.data;
      socket.syncUpdates('thing', this.awesomeThings);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    }); 
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

  changeCollapseBtn(){
  if(this.collapseText == "Would you like to add a group?"){
  this.collapseText = "Collapse subform!";
  }
 else if( this.collapseText == "Collapse subform!"){
  this.collapseText = "Would you like to add a group?";
  }
  }

  addCalendar() {
  this.jsonData=angular.toJson(this.membersTemp);
  this.objectToSerialize={'object':this.jsonData};
 if (this.Email && this.Name) {
      this.$http.post('/api/calendars', { admin: {role: "admin", email: this.Email}, dateCreated: new Date(), name: this.Name, description: this.Description, members: this.membersTemp,   paramSerializer: '$httpParamSerializerJQLike',});
      if(this.sendEmail){
        console.log("checked" + this.sendEmail);
        console.log("main.controller from client. function name = addCalendar()" );
        console.log("add method here to send email to all members. Also will need the list of members to whome send the email.");
        console.log(" array that holds all emails is called this.membersTemp" + this.membersTemp);
      }
  resetAddCalFields();
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

deleteMember(member){
  delete this.membersTemp[member.email];
}


  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }


  }

angular.module('takeTurnsApp')
  .controller('MainController', MainController);

})();
