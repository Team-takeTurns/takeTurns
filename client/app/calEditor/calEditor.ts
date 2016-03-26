'use strict';

angular.module('takeTurnsApp')
  .config(function($routeProvider) {
    $routeProvider
      .when('/admin/:id', {
        templateUrl: 'app/calEditor/calEditor.html',
        controller: 'CalEditorController',
        controllerAs: 'calEditor'
      })
      .when('/calendar', {
        templateUrl: 'app/eventViewer/eventViewer.html',
        controller: 'EventViewerController',
        controllerAs: 'eventViewer'
      })
      .otherwise({
        redirectTo: '/'
      });
  });