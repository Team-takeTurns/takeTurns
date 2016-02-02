'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var UserSchema = new mongoose.Schema({
     role:String,
     link: String,
     email:String, 
     calID: String
});

export default mongoose.model('User', UserSchema);
