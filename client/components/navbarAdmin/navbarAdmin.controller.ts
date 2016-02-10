'use strict';

class NavbarAdminController {


  constructor($location) {
    this.$location = $location;
    }

  //start-non-standard
  menu = [{
    'title': 'Go to Calendar Events',
    'link': '/calendar'
  }];

  isCollapsed = true;
  //end-non-standard

  isActive(route) {
    return route === this.$location.path();
  }
}

angular.module('takeTurnsApp')
  .controller('NavbarAdminController', NavbarAdminController);
