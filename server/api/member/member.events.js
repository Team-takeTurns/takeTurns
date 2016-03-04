/**
 * Member model events
 */

'use strict';

import {EventEmitter} from 'events';
var Member = require('./member.model');
var MemberEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MemberEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Member.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    MemberEvents.emit(event + ':' + doc._id, doc);
    MemberEvents.emit(event, doc);
  }
}

export default MemberEvents;
