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

  constructor($location, $cookies, $http) {
    this.$location = $location;
    this.$http = $http;
     if ($cookies.get("userId")) {
        $http.get('/api/users/'+ $cookies.get("userId")).then(response => {
          this.user = response.data;
          if(this.user.role === "admin"){
            this.userRole = "admin";
          } 
        });
      }
    }

  isActive(route) {
    return route === this.$location.path();
  }
}

angular.module('takeTurnsApp')
  .controller('NavbarCalController', NavbarCalController);
