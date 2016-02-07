'use strict';

angular.module('takeTurnsApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/calendars/admin/:id', {
        templateUrl: 'app/calEditor/calEditor.html',
        controller: 'CalEditorController',
        controllerAs: 'calEditor'
      });
  });