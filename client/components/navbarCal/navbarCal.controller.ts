'use strict';

class NavbarCalController {
  //start-non-standard
  menu = [ {
    'title': 'View Events',
    'link': '/calendar'
  }, {
    'title': 'Add Event',
    'link': '/event'
  },{
    'title': 'Week View',
    'link': '/week'
  }, {
  'title': 'Email',
    'link': '/emailSender'
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
  .controller('NavbarCalController', NavbarCalController);
