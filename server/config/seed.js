/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Calendar from '../api/calendar/calendar.model';


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


Calendar.find({}).removeAsync()
  .then(() => {
    Calendar.create({
      admin:  {   id: "123456", 
                  role:"admin",
                  link: "http://localhost:9000/calendars/11111111111111111",
                  email: "liliya0artyukh@gmail.com"}, 
      active: {   id:"789123", 
                  role: "active",
                  link: "http://localhost:9000/calendars/88888888888888888"},
      members: [{name:"Sue", 
                  email: "sue@ssss.ss"
                },{name:"Lil", 
                email:"lil@dddd.ca"}],
      name:       'Development Tools',
      description: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' +
                  'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
                  'Stylus, Sass, and Less.',
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
  