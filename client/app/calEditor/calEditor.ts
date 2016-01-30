'use strict';

angular.module('takeTurnsApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/calendar', {
        templateUrl: 'app/calEditor/calEditor.html',
        controller: 'CalEditorController',
        controllerAs: 'calEditor'
      });
  });
        console.log(" i  am in calEditor.ts");