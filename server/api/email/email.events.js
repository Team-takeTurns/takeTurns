/**
 * Email model events
 */

'use strict';

import {EventEmitter} from 'events';
var Email = require('./email.model');
var EmailEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
EmailEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Email.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    EmailEvents.emit(event + ':' + doc._id, doc);
    EmailEvents.emit(event, doc);
  }
}

export default EmailEvents;
