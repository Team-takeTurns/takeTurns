'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var calendarCtrlStub = {
  index: 'calendarCtrl.index',
  show: 'calendarCtrl.show',
  create: 'calendarCtrl.create',
  update: 'calendarCtrl.update',
  destroy: 'calendarCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var calendarIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './calendar.controller': calendarCtrlStub
});

describe('Calendar API Router:', function() {

  it('should return an express router instance', function() {
    expect(calendarIndex).to.equal(routerStub);
  });

  describe('GET /api/calendars', function() {

    it('should route to calendar.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'calendarCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/calendars/:id', function() {

    it('should route to calendar.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'calendarCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/calendars', function() {

    it('should route to calendar.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'calendarCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/calendars/:id', function() {

    it('should route to calendar.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'calendarCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/calendars/:id', function() {

    it('should route to calendar.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'calendarCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/calendars/:id', function() {

    it('should route to calendar.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'calendarCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
