'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var CalendarSchema = new mongoose.Schema({
  email: String,
  dateCreated: Date,
  title: String,
  description: String,
  members: String
});

export default mongoose.model('Calendar', CalendarSchema);
