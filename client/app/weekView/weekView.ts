'use strict';

angular.module('takeTurnsApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/week', {
        templateUrl: 'app/weekView/weekView.html',
        controller: 'weekViewController',
        controllerAs: 'weekView'
      });
  });