'use strict';

angular.module('takeTurnsApp', [
  'takeTurnsApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'btford.socket-io',
  'ui.bootstrap',
  'mwl.calendar',
  'ui.bootstrap'
])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

      // liliyas global variable start -->
var myUser = angular.module('myUser',[]);
myUser.factory('UserService', function() {
    return {
        userIDglobal : 'ggg'
    };
});
// liliyas global variable end -->

    $locationProvider.html5Mode(true);
  });