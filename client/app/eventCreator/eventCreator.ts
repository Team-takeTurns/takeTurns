'use strict';

angular.module('takeTurnsApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/event/:id', {
        templateUrl: 'app/eventCreator/eventCreator.html',
        controller: 'EventCreatorController',
        controllerAs: 'eventCreator'
      })
      .when('/event', {
        templateUrl: 'app/eventCreator/eventCreator.html',
        controller: 'EventCreatorController',
        controllerAs: 'eventCreator'
      });
  });