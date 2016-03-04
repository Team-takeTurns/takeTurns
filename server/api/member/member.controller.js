/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/members              ->  index
 * POST    /api/members              ->  create
 * GET     /api/members/:id          ->  show
 * PUT     /api/members/:id          ->  update
 * DELETE  /api/members/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Calendar from '../calendar/calendar.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Members
export function index(req, res) {
  Member.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Member from the DB
export function show(req, res) {
  Member.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Member in the DB
export function create(req, res) {
  Member.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Member in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Member.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Member from the DB
export function destroy(req, res) {
  Member.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
