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

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// sends Email --------------------------------------------this is not parsing data in request - request is empty for some reason
export function sendEmail(req, res) {
    if (req.body._id) {
    delete req.body._id;
  }
  console.log("888888888888888888888888888888 inside BE controller 888888888888888");

        console.log(" req.body " + JSON.stringify(req.body));

        console.log(" req.body.to " + JSON.stringify(req.body.to));
        console.log(" req.body.emailBody " + JSON.stringify(req.body.emailBody));
        console.log(" req.body.subject " + JSON.stringify(req.body.subject));
        console.log(" req.query.to " + JSON.stringify(req.body.to));
 var mailOptions={
        from:'takeTurns Web App <testact0123@gmail.com>',
        to :req.body.to,
        subject: req.body.subject,
        text:req.body.emailBody }
       console.log(mailOptions);

    transporter.sendMail(mailOptions,function(error,response){
        if (error){
            console.log(error);
            res.end("error");
        }else{
            console.log("Message sent: "+response.message);
            res.end("sent");    
        }
    });
  // Email.findAsync()
  //   .then(respondWithResult(res))
  //   .catch(handleError(res));
}

