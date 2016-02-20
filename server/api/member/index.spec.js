'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var memberCtrlStub = {
  index: 'memberCtrl.index',
  show: 'memberCtrl.show',
  create: 'memberCtrl.create',
  update: 'memberCtrl.update',
  destroy: 'memberCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var memberIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './member.controller': memberCtrlStub
});

describe('Member API Router:', function() {

  it('should return an express router instance', function() {
    expect(memberIndex).to.equal(routerStub);
  });

  describe('GET /api/members', function() {

    it('should route to member.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'memberCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/members/:id', function() {

    it('should route to member.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'memberCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/members', function() {

    it('should route to member.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'memberCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/members/:id', function() {

    it('should route to member.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'memberCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/members/:id', function() {

    it('should route to member.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'memberCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/members/:id', function() {

    it('should route to member.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'memberCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
