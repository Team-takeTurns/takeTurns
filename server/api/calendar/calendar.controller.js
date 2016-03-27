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
var sendResult = 1;

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

//code for removing event-----------------------------------
function removeEvent(calId, eventId, res, sendResult){
   Calendar.updateAsync({_id: calId}, {$pull: {events: {_id: eventId}}} )
    .then(checkIfModified(calId, eventId, res, sendResult))
    .catch(handleError(res));
}

function checkIfModified(calId, eventId, res, sendResult){
         return function(entity) {
        if(entity.nModified===0){
           res.status(404).end();
           return null;
        }else{
          if(sendResult === 1){
          getRemovedEventCal(calId, eventId, res);
        }
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
    var updated = _.merge(entity, updates);
    console.log("entity -----------ffffffffff------------ " + entity);
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
    console.log("entity found ----------- " + entity);
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
  Calendar.createAsync(req.body)
    .then(respondWithResult(res, 201))
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


// Deletes event from an existing Calendar in the DB
export function deleteEvent(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  sendResult = 1;
   removeEvent( req.params.calId, req.params.eventId, res, sendResult);
}

//Adding Events to an existing calendar
export function addEvent(req, res){
    if (req.body._id) {
        delete req.body._id;
    }
    Calendar.updateAsync({_id: req.params.calId},
    {$push:{events: req.body}})
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

//Updating event START---------------------------------------------------
export function updateEvent(req, res){
    if (req.body._id) {
    delete req.body._id;
  }
  sendResult = 1;
Calendar.updateAsync( { _id: req.params.calId, 
  events: { "$elemMatch": { _id: req.body.eventId }}}, 
  {$set: {"events.$.title": req.body.title ,
          "events.$.date": req.body.date,
          "events.$.host": req.body.host,
          "events.$.startTime": req.body.startTime,
          "events.$.endTime": req.body.endTime,
          "events.$.info": req.body.info}})
    .then(checkIfModified(req.params.calId, req.body.eventId, res, sendResult));
}

//Updating event END ----------------------------------------

// Updates an existing Calendar in the DB ---- START --------------------
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
    Calendar.updateAsync( { _id: req.params.id }, 
                          {$set: {members: req.body.members}, 
                          name: req.body.name, 
                          description: req.body.description})
    .then(checkIfCalendarModified(req.params.id, res))
    .catch(handleError(res));
}

function checkIfCalendarModified(calId, res){
      return function(entity) {
        if(entity.nModified===0){
           res.status(404).end();
           return null;
        }else{
           getCalendar(calId, res);
        }
        return entity;
      }
  };

function getCalendar(calId, res){
      Calendar.findByIdAsync(calId)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}
// Updates an existing Calendar in the DB ---- END --------------------


// -------------------- time trigered events ----------------------------------
// ------------------- 1 - delete old events logic start -----------------------
//event triggered by time to delete extra records in the database
var events = {};
var calendarIds = [];
var intervalPeriod = 10000;//3600000 - 10000 is 30 seconds - update this if you want more time
var deleteOldEventsInterval = setInterval(myTimer, intervalPeriod);
var counter = 0;
var day;
var hour;
var monthsInput = 1;
var isoDateToCheckAgainst = getIsoDateToDeleteOldEvents(monthsInput);
function myTimer() {
 var d = new Date();
    var res;
    counter++;
    day = d.getDay();
    hour = d.getHours();
    if(day === day){// (day === 7){
      if(hour >= hour && hour < hour + 5 ){ //(time > 2 && time < 5 ){
      Calendar.find({"events.date": {$lte: isoDateToCheckAgainst}}, {$limit: 1})
       .then(getCalendarIds(res))
       .catch(handleError(res));
      }
    }
}

function getCalendarIds(res) {
  return function(entity) {
    //populate array of calendar Ids
    if (entity) {
        for (var i = 0; i < entity.length; i++) { 
          calendarIds.push(entity[i]._id);
    }
    //loop through calendars and delete events older than set date
    for(var i = 0; i < calendarIds.length; i++){
      Calendar.updateAsync({_id: calendarIds[i]},  {$pull : {events: {date: {$lte: isoDateToCheckAgainst}}}} )
      .then(getEvents(res))
      .catch(handleError(res));
    }
    resetVarsForDeleteOldEvents();
    }
  };
}

function  resetVarsForDeleteOldEvents(){
calendarIds=[];
}

//this method is only for viewing if the response from task to delete events is completed with nModified1
function getEvents(res) {
  return function(entity) {
    if (entity) {
          //console.log( " ============ events ============ "  + JSON.stringify(entity));//uncomment this line for testing
    }
  };
}

function getIsoDateToDeleteOldEvents(months){
var deductMiliseconds = (1000 * 3600 * 24 * (months * 30));
var dateInMiliseconds = ((new Date().getTime())- deductMiliseconds);
return (new Date(dateInMiliseconds)).toISOString();
}
// ------------------- 1 - delete old events logic end -----------------------
// ------------------- 2 - delete old empty calendars logic start -----------------------
// ------------------- 2 - delete old empty calendars logic end -----------------------
// ------------------- 3 - delete old unused calendars logic start -----------------------
// ------------------- 3 - delete old unused calendars logic end -----------------------