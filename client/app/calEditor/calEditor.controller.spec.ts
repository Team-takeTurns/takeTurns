'use strict';

describe('Controller: CalEditorController', function() {

  // load the controller's module
  beforeEach(module('takeTurnsApp'));
  beforeEach(module('socketMock'));

  var scope;
  var CalEditorController;
  var $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/calendars')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    CalEditorController = $controller('CalEditorController', {

      $scope: scope
    });
  }));

  it('should attach a list of calendars to the controller', function() {
    $httpBackend.flush();
    expect(CalEditorController.awesomeCalendars.length).to.equal(4);
  });
});