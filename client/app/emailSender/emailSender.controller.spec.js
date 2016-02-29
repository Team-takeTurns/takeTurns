'use strict';

describe('Controller: EmailSenderCtrl', function () {

  // load the controller's module
  beforeEach(module('takeTurnsApp'));

  var EmailSenderCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EmailSenderCtrl = $controller('EmailSenderCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
