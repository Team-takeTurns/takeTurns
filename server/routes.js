/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function (app) {
    // Insert routes below
    app.use('/api/emails', require('./api/email'));
    app.use('/api/calendars', require('./api/calendar'));
    app.use('/api/users', require('./api/user'));
    // All undefined asset or api routes should return a 404
    app.route('/:url(api|auth|components|app|bower_components|assets)/*')
        .get(errors[404]);

    // All other routes should redirect to the index.html
    app.route('/')
        .get((req, res) => {
            res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
        });
    app.route('/calendar/:id')
        .get((req, res) => {
            res.sendFile(path.resolve(app.get('appPath') + '/calendar.html'));
        });
    app.route('/admin/:id')
        .get((req, res) => {
            res.sendFile(path.resolve(app.get('appPath') + '/calAdmin.html'));
        });
    app.route('/week')
        .get((req, res) => {
            res.sendFile(path.resolve(app.get('appPath') + '/calendar.html'));
        });
    app.route('/event')
        .get((req, res) => {
            res.sendFile(path.resolve(app.get('appPath') + '/calendar.html'));
        });
    app.route('/emailSender')
        .get((req, res) => {
            res.sendFile(path.resolve(app.get('appPath') + '/calendar.html'));
        });
}
