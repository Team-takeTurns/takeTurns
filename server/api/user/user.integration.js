'use strict';

var app = require('../..');
import request from 'supertest';

var newUser;

describe('User API:', function() {

  describe('GET /api/users', function() {
    var users;

    beforeEach(function(done) {
      request(app)
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          users = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(users).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/users', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/users')
        .send({
          role: 'admin',
          link: 'http://localhost:9000/',
          email:'email address here',          
          calID: 'calendar id should be here'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newUser = res.body;
          done();
        });
    });

    it('should respond with the newly created user with role admin', function() {
      expect(newUser.role).to.equal('admin');
      expect(newUser.link).to.equal('http://localhost:9000/');
      expect(newUser.email).to.equal('email address here');
      expect(newUser.calID).to.equal('calendar id should be here');
    });

  });

    describe('GET /api/users/:id', function() {
    var user;

    beforeEach(function(done) {
      request(app)
        .get('/api/users/' + newUser._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          user = res.body;
          done();
        });
    });

    afterEach(function() {
      user = {};
    });

    it('should respond with the requested admin user', function() {
      expect(user.role).to.equal('admin');
      expect(user.link).to.equal('http://localhost:9000/');
       expect(user.email).to.equal('email address here');
      expect(user.calID).to.equal('calendar id should be here');
    });

  });


describe('POST /api/users', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/users')
        .send({
          role: 'active',
          link: 'http://localhost:9000/',
          email:'',          
          calID: 'calendar id should be here'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newUser = res.body;
          done();
        });
    });

    it('should respond with the newly created user with role active', function() {
      expect(newUser.role).to.equal('active');
      expect(newUser.link).to.equal('http://localhost:9000/');
      expect(newUser.email).to.equal('');
      expect(newUser.calID).to.equal('calendar id should be here');
    });

  });

  describe('GET /api/users/:id', function() {
    var user;

    beforeEach(function(done) {
      request(app)
        .get('/api/users/' + newUser._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          user = res.body;
          done();
        });
    });

    afterEach(function() {
      user = {};
    });

    it('should respond with the requested active user', function() {
      expect(user.role).to.equal('active');
      expect(user.link).to.equal('http://localhost:9000/');
       expect(user.email).to.equal('');
      expect(user.calID).to.equal('calendar id should be here');
    });

  });



  describe('DELETE /api/users/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/users/' + newUser._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when user does not exist', function(done) {
      request(app)
        .delete('/api/users/' + newUser._id)
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
