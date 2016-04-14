'use strict';

(function() {

    class CalEditorController {

        constructor($http, $scope, socket, $window, $cookies, $location, emailDataContainer) {
            this.$http = $http;
            this.$location = $location;
            this.$window = $window;
            this.emailDataContainer = emailDataContainer;
            this.lengthsOfUrlWithID = 52;
            this.lengthsOfUrlWithID = 52;
            this.calendar;
            this.message;
            this.adminEmail;
            this.calName;
            this.calDescription;
            this.membersTemp = [];
            this.memberName;
            this.memberEmail;
            this.url = window.location;
            this.collapseText = "Would you like to add a user?";
            this.user;
            this.editCal = true;
            this.deleteFalse = true;
            this.memCounter;
            this.addMembers = [];
            this.delMembers = [];
            this.goodDate = new Date();


            //get user id from url or from cookies ----------------------------
            paramSerializer: '$httpParamSerializerJQLike';

            if (this.url.toString().length == this.lengthsOfUrlWithID) {
                $cookies.put("userId", this.url.toString().substr(28, 24));
            } 

            //send request to BE to get user and then call function to get calendar 
            if ($cookies.get("userId")) {
                $http.get('/api/users/' + $cookies.get("userId")
                    ).then(response => {
                    if(response.status == 200){
                        this.user = response.data;
                        if (this.user.role === "admin") {
                            //get calendar from BE
                            this.getCalendar();
                        } else {
                        //display error
                        this.$window.location.href='/userError';
                    }
                }
                    socket.syncUpdates('calendar', this.calendar);
                }).catch(response => {
                    if(response.status == 404){
                        this.$window.location.href='/userError';
                    } else if (response.status == 500){
                        this.$window.location.href='/app/errors/500.html';
                    } else {
                       this.$window.location.href='/unknown';
                    }
                    });
            } else {
                        //display error
                this.$window.location.href='/userError';
             }

            //---------------------- auto generated start ----------------------------------
            $scope.$on('$destroy', function() {
                socket.unsyncUpdates('calendar');
            });
            //---------------------- auto generated end ----------------------------------
        }


        // send request to get calendar from BE -------------------------------
        getCalendar() {
            this.$http.get('/api/calendars/' + this.user.calID
                ).then(response => {
                    if(response.status == 200) {
                        this.calendar = response.data;
                        this.memCounter = this.calendar.members.length;
                    } else {
                       this.$window.location.path('/unknown');
                    }
                }).catch( response => {
                    if(response.status == 404){
                        this.$window.location.href='/404';
                    } else if (response.status == 500){
                        this.$window.location.href='/app/errors/500.html';
                    } else {
                        this.$window.location.href='/unknown';
                    }
            });
        }

        // assigning and defining some variables 
        editCalendar() {
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
            this.$http.delete('/api/calendars/' + this.user.calID).then(response => {
                if(response.status == 204) {
                    this.message = "You have successfully deleted the calendar. \n\nPlease disregard the links that were given to you. \n\nTo create a new calendar click on the logo above to go to home page.";
                    this.deleteFalse = false;
                } else if(response.result == 404){
                        this.$window.location.href='/404';
                    } else {
                    this.$window.location.href = '/unknown';
                }
            }).catch( response => {
                    if(response.status == 404){
                        this.$window.location.href='/404';
                    } else if (response.status == 500){
                        this.$window.location.href='/app/errors/500.html';
                    } else {
                        this.$window.location.href='/unknown';
                    }
                });
        }

        //cancel update - go back to view calendar
        cancelUpdate() {
            this.editCal = true;
        }


        //send request to BE to update calendar details
        updateCalendar() {
             //update admin email
            if (this.adminEmail) {
                this.$http.put('/api/users/' + this.user._id, { email: this.adminEmail }).then(response => {
                    this.user = response.data;
                });
            }
            
            this.$http.put('/api/calendars/' + this.user.calID, { name: this.calName, description: this.calDescription, members: this.membersTemp, paramSerializer: '$httpParamSerializerJQLike' }).then(response => {
                this.calendar = response.data;
                this.message = "You have successfully edited the calendar.";
                alert(this.message);
                this.editCal = true; // goes back to the calendar details view
            });
        }

        //delete members from temporary array
        deleteMember(member) {
            for (var i = 0; i < this.membersTemp.length; i++) {
                if (this.membersTemp[i].email === member.email) {
                    this.membersTemp.splice(i, 1);
                    break;
                }
            }
        }

        //adding new members to temp array
        addMember() {
            if (this.memberEmail && this.memberName) {
                this.membersTemp.push({ name: this.memberName, email: this.memberEmail });
            }
        }

        convertDate(isoDate) {
            this.goodDate = Date(isoDate);
            return this.goodDate;
        }
        
        //Open Email page with Admin link in the Body
        shareAdminLink(link) {
            //before writing values to this service clear all values
            this.emailDataContainer.clearAll();
            this.emailDataContainer.setBody("The admin user for the " + this.calendar.name + " calendar Would like to share the following admin link with you: \n" + link +
                "\nCalendar Info: " + "\nName: " + this.calendar.name + "\nDescription: " + this.calendar.description);
            this.emailDataContainer.setSubject("Admin link to the calendar '" + this.calendar.name + "'");
        }
        
        //Open Email Page with Users Link
        shareUserLink(link) {
            //before writing values to this service clear all values
            this.emailDataContainer.clearAll();
            this.emailDataContainer.setBody("The admin user for the " + this.calendar.name + " calendar Would like to share the following link with you: \n" + link +
                "\nCalendar Info: " + "\nName: " + this.calendar.name + "\nDescription: " + this.calendar.description);
            this.emailDataContainer.setSubject("Link to the calendar '" + this.calendar.name + "'");
        }

    }

    angular.module('takeTurnsApp')
        .controller('CalEditorController', CalEditorController);

})();
