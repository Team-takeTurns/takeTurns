'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

/*
var CalendarSchema = new mongoose.Schema({
  email: String,
  dateCreated: Date,
  title: String,
  description: String,
  members: String
});
*/
var CalendarSchema = new mongoose.Schema({
  admin:  {     id: String, 
                role:String,
                link: String,
                email:String}, 
  active: {     id:String, 
                role: String,
                link: String},
  members: [{   name: String, 
                email: String
  }],              
  name:         String,
  description:  String,
  dateCreated:  Date,
  events:[{     title: String,
                host: String, 
                date: Date,
                startTime: String, 
                endTime: String,
                info: String,
                reminder: Date,
                guestList: [email:String]
      }]
});

export default mongoose.model('Calendar', CalendarSchema);
