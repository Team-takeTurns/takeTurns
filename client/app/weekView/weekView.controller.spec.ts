'use strict';

describe('Controller: weekViewController', function() {

  // load the controller's module
  beforeEach(module('takeTurnsApp'));
  beforeEach(module('socketMock'));

  var scope;
  var weekViewController;
  var $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/events')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    weekViewController = $controller('weekViewController', {

      $scope: scope
    });
  }));

  it('should attach a list of events to the controller', function() {
    $httpBackend.flush();
    expect(weekViewController.awesomeEvents.length).to.equal(4);
  });
});
           console.log(" i  am in weekViewController.controller specs");