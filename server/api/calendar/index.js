'use strict';

var express = require('express');
var controller = require('./calendar.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/:calId', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.patch('/:calId/deleteEvent/:eventId', controller.deleteEvent);
router.patch('/updateMembers/:calId', controller.updateMembers);
router.put('/updateEvent/:calId', controller.updateEvent);

module.exports = router;
