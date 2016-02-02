'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var userCtrlStub = {
  index: 'userCtrl.index',
  show: 'userCtrl.show',
  create: 'userCtrl.create',
  update: 'userCtrl.update',
  destroy: 'userCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var userIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './user.controller': userCtrlStub
});

describe('User API Router:', function() {

  it('should return an express router instance', function() {
    expect(userIndex).to.equal(routerStub);
  });

  describe('GET /api/users', function() {

    it('should route to user.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'userCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/users/:id', function() {

    it('should route to user.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'userCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/users', function() {

    it('should route to user.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'userCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/users/:id', function() {

    it('should route to user.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'userCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/users/:id', function() {

    it('should route to user.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'userCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/users/:id', function() {

    it('should route to user.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'userCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
