'use strict';

angular.module('takeTurnsApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/week/:id', {
        templateUrl: 'app/weekView/weekView.html',
        controller: 'weekViewController',
        controllerAs: 'weekView'
      })
      .when('/week', {
        templateUrl: 'app/weekView/weekView.html',
        controller: 'weekViewController',
        controllerAs: 'weekView'
      });
  });