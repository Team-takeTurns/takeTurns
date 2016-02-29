'use strict';

var app = require('../..');
import request from 'supertest';

var newMember;

describe('Member API:', function() {

  describe('GET /api/members', function() {
    var members;

    beforeEach(function(done) {
      request(app)
        .get('/api/members')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          members = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(members).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/members', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/members')
        .send({
          name: 'New Member',
          info: 'This is the brand new member!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newMember = res.body;
          done();
        });
    });

    it('should respond with the newly created member', function() {
      expect(newMember.name).to.equal('New Member');
      expect(newMember.info).to.equal('This is the brand new member!!!');
    });

  });

  describe('GET /api/members/:id', function() {
    var member;

    beforeEach(function(done) {
      request(app)
        .get('/api/members/' + newMember._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          member = res.body;
          done();
        });
    });

    afterEach(function() {
      member = {};
    });

    it('should respond with the requested member', function() {
      expect(member.name).to.equal('New Member');
      expect(member.info).to.equal('This is the brand new member!!!');
    });

  });

  describe('PUT /api/members/:id', function() {
    var updatedMember;

    beforeEach(function(done) {
      request(app)
        .put('/api/members/' + newMember._id)
        .send({
          name: 'Updated Member',
          info: 'This is the updated member!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedMember = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMember = {};
    });

    it('should respond with the updated member', function() {
      expect(updatedMember.name).to.equal('Updated Member');
      expect(updatedMember.info).to.equal('This is the updated member!!!');
    });

  });

  describe('DELETE /api/members/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/members/' + newMember._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when member does not exist', function(done) {
      request(app)
        .delete('/api/members/' + newMember._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
