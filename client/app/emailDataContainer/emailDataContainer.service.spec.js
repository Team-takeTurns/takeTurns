'use strict';

describe('Service: emailDataContainer', function () {

  // load the service's module
  beforeEach(module('takeTurnsApp'));

  // instantiate service
  var emailDataContainer;
  beforeEach(inject(function (_emailDataContainer_) {
    emailDataContainer = _emailDataContainer_;
  }));

  it('should do something', function () {
    expect(!!emailDataContainer).to.be.true;
  });

});
