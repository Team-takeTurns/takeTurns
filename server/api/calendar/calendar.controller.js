/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/calendars              ->  index
 * POST    /api/calendars              ->  create
 * GET     /api/calendars/:id          ->  show
 * PUT     /api/calendars/:id          ->  update
 * DELETE  /api/calendars/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Calendar from './calendar.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      console.log("2" + entity);
      res.status(statusCode).json(entity);

    }
  };
}

//code for removing event-----------------------------------
function removeEvent(calId, eventId, res){
   Calendar.updateAsync({_id: calId}, {$pull: {events: {_id: eventId}}} )
    .then(checkIfModified(calId, eventId, res))
    .catch(handleError(res));
}

function checkIfModified(calId, eventId, res){
         return function(entity) {
        if(entity.nModified===0){
           res.status(404).end();
           return null;
        }else{
          getRemovedEventCal(calId, eventId, res);
        return entity;
      }
  };
}

function getEventForView(updates) {
  return function(entity) {
    var indexEvent = _.findIndex(entity.events, "id", updates);
    var deletedArray  =_.pullAt(entity.events, indexEvent );
    var updated = entity;
        return updated;
  };
}


function getRemovedEventCal(calId, eventId, res){
    Calendar.findByIdAsync(calId)
    .then(handleEntityNotFound(res))
    .then(getEventForView(eventId))
    .then(respondWithResult(res))
    .catch(handleError(res));
}
//code for removing event end-----------------------------

function saveUpdates(updates) {
  return function(entity) {
      console.log(" 777 updates " + updates);
        console.log(" 777 entity " + entity);
    var updated = _.merge(entity, updates);
            console.log(" 8 updated " + updated);
    return updated.saveAsync()
      .spread(updated => {
             console.log(" 888 updated " + updated);
        return updated;
      });
  };
}


function removeEntity(res) {
  return function(entity) {
    if (entity) {
               console.log( "4 " + entity);
      return entity.removeAsync()
        .then(() => {
             console.log( "5 " + entity);
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
       console.log("6 " + res);
  return function(entity) {
              console.log(" 4444444444  " + JSON.stringify( entity)); 
    if (!entity) {
      res.status(404).end();
      return null;
    }
           console.log("1" + entity);
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;

  return function(err) {
             console.log("3" + err);
    res.status(statusCode).send(err);
  };
}

// Gets a list of Calendars
export function index(req, res) {
  Calendar.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Calendar from the DB
export function show(req, res) {
  Calendar.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Calendar in the DB
export function create(req, res) {
    console.log("req.body from create = " + JSON.stringify(req.body));
  Calendar.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Calendar in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Calendar.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Calendar from the DB
export function destroy(req, res) {
 console.log("Calendar find from delete "+ JSON.stringify(Calendar.findByIdAsync(req.params.id)));
  Calendar.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}


// Updates an existing Calendar in the DB
export function deleteEvent(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
   removeEvent( req.params.calId, req.params.eventId, res);
}


