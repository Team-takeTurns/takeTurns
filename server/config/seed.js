/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Calendar from '../api/calendar/calendar.model';

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
