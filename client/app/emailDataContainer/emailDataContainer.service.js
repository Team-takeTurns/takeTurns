'use strict';

angular.module('takeTurnsApp')
  .factory('emailDataContainer', ["$cookies", function ($cookies) {
    //if you make changes to this file then rebuild the project because it will not rebuild automatically


    //every time you call this service to set values first unset them
    //and every time you retrieve values also unset them
      var to = [];
      var subject="";
      var body = "";

return {
      setBody: function(data) {
        body = data;
        $cookies.put("body", data);
      },
      getBody: function() {
        body = $cookies.get("body");
        return body;
      },
      setTo: function(data) {
        to = data;
        $cookies.put("to", data);
      },
      getTo: function() {
        to = $cookies.get("to");
        return to;
      },
      setSubject: function(data) {
        subject = data;
        $cookies.put("subject", data);
      },
      getSubject: function() {
        subject = $cookies.get("subject");
        return subject;
      },
      clearAll: function() {
        to = [];
        subject="";
        body = "";
        $cookies.remove("body");
        $cookies.remove("subject");
        $cookies.remove("to");
      }
    }

  }]);
