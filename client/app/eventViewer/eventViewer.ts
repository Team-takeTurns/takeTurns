'use strict';

angular.module('takeTurnsApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/calendar/:id', {
        templateUrl: 'app/eventViewer/eventViewer.html',
        controller: 'EventViewerController',
        controllerAs: 'eventViewer'
      });
  });