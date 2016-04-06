
'use strict';

(function() {

    class EmailSenderCtrl {

        constructor($http, $scope, socket, $cookies, emailDataContainer) {
            this.$http = $http;
            this.emailDataContainer = emailDataContainer;
            this.to;
            this.subject = this.emailDataContainer.getSubject();
            this.emailBody = this.emailDataContainer.getBody();
            this.result;
            this.message;
            //TODO set the who from as the name of the calendar not the name of the app as we have currently

            //after reading from this service clear all values
            this.emailDataContainer.clearAll();
        }
        //send request to BE to send email
        sendEmail() {

            this.message = "Sending E-mail...Please wait";
            this.$http.post('/api/emails', { to: this.to, emailBody: this.emailBody, subject: this.subject }).then(response => {
                this.result = response.data;
                if (this.result == "sent") {
                    window.alert("Message Sent");
                    window.close();
                }
            });
        }
    }

    angular.module('takeTurnsApp')
        .controller('EmailSenderCtrl', EmailSenderCtrl);

})();
