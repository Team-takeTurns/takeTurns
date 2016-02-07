'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Home',
    'link': '/'
  }, {
    'title': 'Admin Calendar',
    'link': '/calendar'
  }, {
    'title': 'Add Event',
    'link': '/event'
  }, {
    'title': 'View Events',
    'link': '/events'
  }, {
    'title': 'Week View',
    'link': '/week'
  }];

  isCollapsed = true;
  //end-non-standard

  constructor($location) {
    this.$location = $location;
    }

  isActive(route) {
    return route === this.$location.path();
  }
}

angular.module('takeTurnsApp')
  .controller('NavbarController', NavbarController);
