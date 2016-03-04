'use strict';

angular.module('takeTurnsApp')
  .directive('navbar', () => ({
    templateUrl: 'components/navbarAdmin/navbarAdmin.html',
    restrict: 'E',
    controller: 'NavbarAdminController',
    controllerAs: 'navAdmin'
  }));
