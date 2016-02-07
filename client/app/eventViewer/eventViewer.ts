'use strict';

angular.module('takeTurnsApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/events', {
        templateUrl: 'app/eventViewer/eventViewer.html',
        controller: 'EventViewerController',
        controllerAs: 'eventViewer'
      });
  });
        console.log(" i  am in eventViewer.ts");