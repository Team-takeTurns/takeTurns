'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var emailCtrlStub = {
  index: 'emailCtrl.index',
  show: 'emailCtrl.show',
  create: 'emailCtrl.create',
  update: 'emailCtrl.update',
  destroy: 'emailCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var emailIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './email.controller': emailCtrlStub
});

describe('Email API Router:', function() {

  it('should return an express router instance', function() {
    expect(emailIndex).to.equal(routerStub);
  });

  describe('GET /api/emails', function() {

    it('should route to email.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'emailCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/emails/:id', function() {

    it('should route to email.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'emailCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/emails', function() {

    it('should route to email.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'emailCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/emails/:id', function() {

    it('should route to email.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'emailCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/emails/:id', function() {

    it('should route to email.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'emailCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/emails/:id', function() {

    it('should route to email.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'emailCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
