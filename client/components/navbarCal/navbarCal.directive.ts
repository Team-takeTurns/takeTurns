'use strict';

angular.module('takeTurnsApp')
  .directive('navbar', () => ({
    templateUrl: 'components/navbarCal/navbarCal.html',
    restrict: 'E',
    controller: 'NavbarCalController',
    controllerAs: 'navCal'
  }));
