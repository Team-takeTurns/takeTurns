'use strict';

describe('Controller: EventCreatorController', function() {

  // load the controller's module
  beforeEach(module('takeTurnsApp'));
  beforeEach(module('socketMock'));

  var scope;
  var EventCreatorController;
  var $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/calendars')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    EventCreatorController = $controller('EventCreatorController', {

      $scope: scope
    });
  }));

  it('should attach a list of calendars to the controller', function() {
    $httpBackend.flush();
    expect(EventCreatorController.awesomeCalendars.length).to.equal(4);
  });
});
           console.log(" i  am in EventCreatorController.controller specs");