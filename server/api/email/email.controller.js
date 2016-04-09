/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/emails              ->  index
 * POST    /api/emails              ->  create
 * GET     /api/emails/:id          ->  show
 * PUT     /api/emails/:id          ->  update
 * DELETE  /api/emails/:id          ->  destroy
 */

'use strict';

import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

//get email user account
var options={
    service:'gmail',
    auth:{
        user:'testact0123@gmail.com',
        pass:'pass0123'
    }
};

/*configure smtp server*/
var transporter=nodemailer.createTransport(smtpTransport(options));

  
function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

// Error Handler
function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// sends Email. This is not parsing data in request - request is empty for some reason
export function sendEmail(req, res) {
    if (req.body._id) {
    delete req.body._id;
  }
 var mailOptions={
        from:'takeTurns Web App <testact0123@gmail.com>',
        to :req.body.to,
        subject: req.body.subject,
        text:req.body.emailBody }

    transporter.sendMail(mailOptions,function(error,response){
        if (error){
            res.end("error");
        }else{
            res.end("sent");    
        }
    });
}

