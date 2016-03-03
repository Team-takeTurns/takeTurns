'use strict';

angular.module('takeTurnsApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/emailSender', {
        templateUrl: 'app/emailSender/emailSender.html',
        controller: 'EmailSenderCtrl',
        controllerAs: 'emailSender'
      });
  });
