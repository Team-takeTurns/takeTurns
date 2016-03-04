'use strict';

angular.module('takeTurnsApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/users/:userId', {

        templateUrl: 'app/calEditor/calEditor.html',
        controller: 'UserController',
        controllerAs: 'userCtrl'
      });
      
  });