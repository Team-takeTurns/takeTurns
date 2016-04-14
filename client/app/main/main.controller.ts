'use strict';

(function() {

    class MainController {

        constructor($http, $scope, socket
        ,emailDataContainer
        ) {
            this.$http = $http;
            this.currentGroup = "None";
            this.memCounter = 0;
            this.btnAddMemberText = "Would you like to add a user?";
            this.btnCollapseText = "Collapse subform!";
            this.collapseText = this.btnAddMemberText;
            this.firstEntry = 0;
            this.Name = '';
            this.Email = '';
            this.jsonData = [];
            this.objectToSerialize = [];
            this.sendEmail = false;
            this.mainDiv = true;
            this.calendar;
            this.role = "";
            this.d;
            this.len;
            this.adminLink;
            this.activeLink;
            this.adminLinkUrl = "http://localhost:9000/admin/";
            this.activeLinkUrl = "http://localhost:9000/calendar/";
            this.adminUser;
            this.activeUser;
            this.id;
            this.adminEmail;
            this.membersTemp = [];
            this.emailDataContainer = emailDataContainer;
            this.resultAdmin;
            this.resultMembers;
            this.subjectAdmin;
            this.resultAdmin;
            this.memEmails;
            $scope.$on('$destroy', function() {
                socket.unsyncUpdates('calendar');
            });
        }

        changeCollapseBtn() {
            if (this.collapseText == this.btnAddMemberText) {
                this.collapseText = this.btnCollapseText;
            }
            else if (this.collapseText == this.btnCollapseText) {
                this.collapseText = this.btnAddMemberText;
            }
        }
        //go to email 
        addCalendar() {
            this.adminEmail = this.Email;
            if (this.Email && this.Name) {
                this.$http.post('/api/calendars', { dateCreated: new Date(), name: this.Name, description: this.Description, members: this.membersTemp, paramSerializer: '$httpParamSerializerJQLike' }).then(response => {
                    this.calendar = response.data;
                    this.createActiveUser();
                    this.createAdminUser();
                    
                });
                
               
            }
        }

        sendEmailtoAdmin(){
            this.messageAdmin= " Your calendar "+ this.calendar.name +" was created. \n Follow the link below for admin view where you can update or delete your calendar. "+
                                this.adminLink +  " \n Use the link below for other users so they can create and view events. " + this.activeLink;
            this.subjectAdmin=" Admin Calendar Links ";
            
              this.$http.post('/api/emails', { to: this.Email , emailBody: this.messageAdmin, subject: this.subjectAdmin }).then(response => {
                this.resultAdmin = response.data;
              });
        }
        sendEmailtoMembers(){
            this.messageMembers= " Your calendar "+ this.calendar.name +" was created. \n Use the link below for other users so they can create and view events. " + this.activeLink;
            this.subjectMembers=" User Calendar Links ";
            this.memEmails="";
            for(var i=0; i<this.membersTemp.length;i++){
                
                console.log(this.membersTemp[i].email);
                this.memEmails+=this.membersTemp[i].email;
                if(i!=(this.membersTemp.length-1)){this.memEmails+=", ";}
            }
            this.$http.post('/api/emails', { to: this.memEmails, emailBody: this.messageMembers, subject: this.subjectMembers }).then(response => {
                this.resultAdmin = response.data;
              });
        }
        createAdminUser() {
            this.$http.post('/api/users', { role: "admin", email: this.adminEmail, calID: this.calendar._id }).then(response => {
                this.adminUser = response.data;
                this.createAdminLink();
                this.adminEmail = '';
            });
        }

        createActiveUser() {
            this.$http.post('/api/users', { role: "active", calID: this.calendar._id }).then(response => {
                this.activeUser = response.data;
                this.createActiveLink();
            });
        }

        createAdminLink() {
            this.adminLink = this.adminLinkUrl + this.adminUser._id;
            this.adminUserUpdate();
        }
        createActiveLink() {
            this.activeLink = this.activeLinkUrl + this.activeUser._id;
            this.activeUserUpdate();
        }

        adminUserUpdate() {
            this.$http.put('/api/users/' + this.adminUser._id, { link: this.adminLink, activeUserLink: this.activeLink }).then(response => {
                this.adminUser = response.data;
            });
            
        this.sendEmailtoAdmin();   
        if (this.sendEmail) {
            this.sendEmailtoMembers();
        }
        this.resetAddCalFields();
        this.mainDiv = false;          
        }
        
        activeUserUpdate() {
            this.$http.put('/api/users/' + this.activeUser._id, { link: this.activeLink }).then(response => {
                this.activeUser = response.data;
            });
        }


        resetAddCalFields() {
            this.memCounter = 0;
            this.currentGroup = "None";
            this.sendEmail = false;
            this.membersTemp = [];
            this.Description = '';
            this.Name = '';
            this.Email = '';
        }

        addMember() {
            if (this.memEmail && this.memName) {
                this.membersTemp.push({ name: this.memName, email: this.memEmail });
                if (this.firstEntry == 0) {
                    this.firstEntry = 1;
                }
                this.memCounter++;
                this.memName = '';
                this.memEmail = '';
                this.currentGroup = this.memCounter;
            }
        }

        deleteMember(member) {
            for (var i = 0; i < this.membersTemp.length; i++) {
                if (this.membersTemp[i].email === member.email) {
                    this.membersTemp.splice(i, 1);
                    this.memCounter--;

                    if (this.memCounter === 0) {
                        this.currentGroup = "None";
                    } else {
                        this.currentGroup = this.memCounter;
                    }
                    break;
                }
            }
        }

        deleteUser(user) {
            this.$http.delete('/api/users/' + user._id);
        }

         
        shareUserLink(link) {
            //before writing values to this service clear all values
            this.emailDataContainer.clearAll();
            this.emailDataContainer.setBody("The admin user for the " + this.calendar.name + " calendar Would like to share the following link with you: \n" + link +
                "\nCalendar Info: " + "\nName: " + this.calendar.name + "\nDescription: " + this.calendar.description);
            this.emailDataContainer.setSubject("Link to the calendar '" + this.calendar.name + "'");
        }
    }

    angular.module('takeTurnsApp')
        .controller('MainController', MainController);

})();
