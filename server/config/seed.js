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
     link: "http://localhost:9000/admin/56b044743ef01300237649cb",
     email:"liliya0artyukh@gmail.com", 
     calID: "56b1e6924f07f3840f8ce556",
     activeUserLink: "http://localhost:9000/calendar/56b044743ef01300237649ca"
      }, {
     _id:"56b044743ef0130023764912",
     role:"active",
     link: "http://localhost:9000/calendar/56b044743ef0130023764912",
     email:"", 
     calID: "56b1e6924f07f3840f8ce512"
      }, {
     _id: "56b044743ef0130023764913",
     role:"admin",
     link: "http://localhost:9000/admin/56b044743ef0130023764913",
     email:"liliya0artyukh@gmail.com", 
     calID: "56b1e6924f07f3840f8ce512",
     activeUserLink: "http://localhost:9000/calendar/56b044743ef0130023764912"
      }, {
     _id:"56b044743ef0130023764914",
     role:"active",
     link: "http://localhost:9000/calendar/56b044743ef0130023764914",
     email:"", 
     calID: "56b1e6924f07f3840f8ce514"
      }, {
     _id: "56b044743ef0130023764915",
     role:"admin",
     link: "http://localhost:9000/admin/56b044743ef0130023764915",
     email:"liliya0artyukh@gmail.com", 
     calID: "56b1e6924f07f3840f8ce514",
     activeUserLink: "http://localhost:9000/calendar/56b044743ef0130023764914"
      });
  });
  

Calendar.find({}).removeAsync()
  .then(() => {
    Calendar.create({
        _id: "56b1e6924f07f3840f8ce556",
      members: [{name:"Sue", 
                _id:"56ca72353876946c0c49b391",
                  email: "sue@ssss.ss"
                },{name:"Lil", 
                _id:"56ca72353876946c0c49b390",
                email:"lil@llll.lll"
                }, {name:"Maggie", 
                _id:"56ca72353876946c0c49b38f",
                email:"mmm@mmm.mm"
                }, {name:"Chris", 
                _id:"56ca72353876946c0c49b38e",
                email:"cccccc@ccccc.ccc"}],
      name:       'My Cal Name - Stephan',
      description: 'This is the description for the event. TEST',
      dateCreated: new Date(),
      events: [{  title:"Dinner", 
                  _id:"56c931132a65e1c81f986cbf",
                  host: "Steve", 
                  date: new Date((new Date().getTime()) + (1000 * 3600 * 24)),
                  startTime: "17:00:00-05:00", 
                  endTime: "20:00:00-05:00",
                  info: "dinner",
                  reminder: new Date((new Date().getTime()) + (1000 * 3600 * 24)),
                  guestList: ["email_1@ddd.ca", "david@ddd.ca", "bob@sss.ca"]
                },
                {  title:"Lunch", 
                   _id:"56c931132a65e1c81f986cbe",
                  host: "Mike", 
                  date: new Date((new Date().getTime()) + (1000 * 3600 * 24)),
                  startTime: "11:00:00-05:00", 
                  endTime: "14:00:00-05:00",
                  info: "dinner",
                  reminder: new Date((new Date().getTime()) + (1000 * 3600 * 24)),
                  guestList: ["email_1@ddd.ca", "david@ddd.ca", "bob@sss.ca"]
                },
                {  title:"Church", 
                   _id:"56c931132a65e1c81f986c34",
                  host: "Albert", 
                  date: new Date((new Date().getTime()) + (1000 * 3600 * 24)),
                  startTime: "08:00:00-05:00", 
                  endTime: "11:00:00-05:00",
                  info: "dinner",
                  reminder: new Date((new Date().getTime()) + (1000 * 3600 * 24)),
                  guestList: ["email_1@ddd.ca", "david@ddd.ca", "bob@sss.ca"]
                }, {  title:"Dinner", 
                  _id:"56c931132a65e1c81f986c35",
                  host: "Anna", 
                  date: new Date(),
                  startTime: "18:00:00-05:00", 
                  endTime: "20:00:00-05:00",
                  info: "dinner",
                  reminder: new Date(),
                  guestList: ["email_1@ddd.ca", "david@ddd.ca", "bob@sss.ca"]
                },
                {  title:"Lunch", 
                   _id:"56c931132a65e1c81f986c36",
                  host: "Paul", 
                  date: new Date(),
                  startTime: "12:00:00-05:00", 
                  endTime: "14:00:00-05:00",
                  info: "dinner",
                  reminder: new Date(),
                  guestList: ["email_1@ddd.ca", "david@ddd.ca", "bob@sss.ca"]
                },
                {  title:"Breakfast", 
                   _id:"56c931132a65e1c81f986cbd",
                  host: "Maggie", 
                  date: new Date(),
                  startTime: "09:00:00-05:00", 
                  endTime: "11:00:00-05:00",
                  info: "dinner",
                  reminder: new Date(),
                  guestList: ["email_1@ddd.ca", "david@ddd.ca", "bob@sss.ca"]
                }]
      }, {
        _id: "56b1e6924f07f3840f8ce512",
      members: [{name:"Sue", 
                _id:"56ca72353876946c0c49b321",
                  email: "sue@ssss.ss"
                },{name:"Lil", 
                _id:"56ca72353876946c0c49b322",
                email:"lil@llll.lll"
                }, {name:"Maggie", 
                _id:"56ca72353876946c0c49b323",
                email:"mmm@mmm.mm"
                }, {name:"Chris", 
                _id:"56ca72353876946c0c49b324",
                email:"cccccc@ccccc.ccc"}],
      name:       'Babysitting Richi',
      description: 'This is the description for the event. TEST',
      dateCreated: new Date(),
      events: [{  title:"Shopping", 
                  _id:"56c931132a65e1c81f986c21",
                  host: "Albert", 
                  date: "2016-01-24T02:32:12.457Z",
                  startTime: "18:00:00-05:00", 
                  endTime: "20:00:00-05:00",
                  info: "dinner",
                  reminder: new Date(),
                  guestList: ["email_1@ddd.ca", "david@ddd.ca", "bob@sss.ca"]
                },
                {  title:"Church", 
                   _id:"56c931132a65e1c81f986c22",
                  host: "Albert", 
                  date: "2016-02-28T02:32:12.457Z",
                  startTime: "18:00:00-05:00", 
                  endTime: "20:00:00-05:00",
                  info: "dinner",
                  reminder: new Date(),
                  guestList: ["email_1@ddd.ca", "david@ddd.ca", "bob@sss.ca"]
                },
                {  title:"Walk", 
                   _id:"56c931132a65e1c81f986c23",
                  host: "Albert", 
                  date: "2016-01-24T02:32:12.457Z",
                  startTime: "18:00:00-05:00", 
                  endTime: "20:00:00-05:00",
                  info: "dinner",
                  reminder: new Date(),
                  guestList: ["email_1@ddd.ca", "david@ddd.ca", "bob@sss.ca"]
                }]
      }, {
        _id: "56b1e6924f07f3840f8ce514",
      members: [],
      name:       'Sharing Car',
      description: 'This is the description for the event. TEST',
      dateCreated: new Date(),
      events: [{  title:"Visit", 
                  _id:"56c931132a65e1c81f986c14",
                  host: "Albert", 
                  date: "2016-02-24T02:32:12.457Z",
                  startTime: "18:00:00-05:00", 
                  endTime: "20:00:00-05:00",
                  info: "dinner",
                  reminder: new Date(),
                  guestList: ["email_1@ddd.ca", "david@ddd.ca", "bob@sss.ca"]
                },
                {  title:"Doctor", 
                   _id:"56c931132a65e1c81f986c15",
                  host: "Albert", 
                  date: "2016-02-24T02:32:12.457Z",
                  startTime: "18:00:00-05:00", 
                  endTime: "20:00:00-05:00",
                  info: "dinner",
                  reminder: new Date(),
                  guestList: ["email_1@ddd.ca", "david@ddd.ca", "bob@sss.ca"]
                },
                {  title:"Park", 
                   _id:"56c931132a65e1c81f986c16",
                  host: "Albert", 
                  date: "2016-01-24T02:32:12.457Z",
                  startTime: "18:00:00-05:00", 
                  endTime: "20:00:00-05:00",
                  info: "dinner",
                  reminder: new Date(),
                  guestList: ["email_1@ddd.ca", "david@ddd.ca", "bob@sss.ca"]
                }]
      });
  });
  