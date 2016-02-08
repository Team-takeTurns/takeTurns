/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Calendar from '../api/calendar/calendar.model';
import User from '../api/user/user.model';

/*
Calendar.find({}).removeAsync()
  .then(() => {
    Calendar.create({
      email: "liliya0artyukh@gmail.com",
      dateCreated: "",
      title: 'Sharing Car',
      description: 'Share car among family members',
      members: "ddddd"
      //members: [{name: "dddd", email:"ddddd@ddd.com"}]
    }, {
      email: "liliya0artyukh@gmail.com",
      dateCreated: "",
      title: 'Share cottage in the summer',
      description: 'Share cottage among family members',
      members: ""
      //members: [{name: "aaaaaaa", email:"aaaaaaaaa@aaa.yahoo"}]
    }, {
      email: "liliya0artyukh@gmail.com",
      dateCreated: "",
      title: 'Share laundy duty',
      description: 'Take turns to do laundry in the house',
      members: "vvvvvv"
     // members: [{name: "vvvvvv", email:"vvvvv@vvvv.ca"}]
    }, {
      email: "liliya0artyukh@gmail.com",
      dateCreated: "",
      title: 'Baby care',
      description: 'Share getting up at night to watch the baby',
      members: "cccccc"
     // members: [{name: "ccccccc", email:"ccccc.com"}]
    }, {
      email: "liliya0artyukh@gmail.com",
      dateCreated: "",
      title: 'Dad care',
      description: 'Taking turns to take care of dad',
      members: "xxxxxx"
    //  members: [{name: "xxxxxx", email:"xxxxxx@xxxx.com"}]
    }, {
        email: "liliya0artyukh@gmail.com",
      dateCreated: "",
           title: 'Cleaning house',
      description: 'share responsibility of cleaning the house',
      members: "ggggg"
    //  members: [{name: "gggggg", email:"ggggg@ggggg.ca"}]
    });
  });
*/

User.find({}).removeAsync()
  .then(() => {
    User.create({
     _id:"56b044743ef01300237649ca",
     role:"active",
     link: "http://localhost:9000/calendar/56b044743ef01300237649ca",
     email:"", 
     calID: "56b1e6924f07f3840f8ce556"
      }, {
     _id: "56b044743ef01300237649cb",
     role:"admin",
     link: "http://localhost:9000/calendars/admin/56b044743ef01300237649cb",
     email:"liliya0artyukh@gmail.com", 
     calID: "56b1e6924f07f3840f8ce556"
      });
  });
  

Calendar.find({}).removeAsync()
  .then(() => {
    Calendar.create({
        _id: "56b1e6924f07f3840f8ce556",
      members: [{name:"Sue", 
                  email: "sue@ssss.ss"
                },{name:"Lil", 
                email:"lil@dddd.ca"}],
      name:       'My Cal Name - Stephan',
      description: 'This is the description for the event. TEST',
      dateCreated: new Date(),
      events: [{  title:"dinner", 
                  host: "Albert", 
                  date: new Date(),
                  startTime: "7:00PM", 
                  endTime: "9:00PM",
                  info: "dinner",
                  reminder: new Date(),
                  guestList: ["email_1@ddd.ca", "david@ddd.ca", "bob@sss.ca"]
                }]
      });
  });
  