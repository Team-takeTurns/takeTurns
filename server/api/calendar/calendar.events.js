/**
 * Calendar model events
 */

'use strict';

import {EventEmitter} from 'events';
var Calendar = require('./calendar.model');
var CalendarEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CalendarEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Calendar.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    CalendarEvents.emit(event + ':' + doc._id, doc);
    CalendarEvents.emit(event, doc);
  }
}

export default CalendarEvents;
