const { ensureLoggedIn } = require('connect-ensure-login');
const express = require('express');
const userRoles = require('../userRoles');
const router = express.Router();
const MessagingResponse = require('twilio').twiml.MessagingResponse;

router.get(
  '/',
  ensureLoggedIn(),
  userRoles.can('access secret content'),
  (req, res) => {
    res.render('index', { title: 'Secrets', user: req.user });
  },
);

router.post(
  '/',
  ensureLoggedIn(),   
  (req, res) => {
  const twiml = new MessagingResponse();
  
  twiml.message('Noted!');
  console.log(`Phone Number is: ` + req.body.From + ` and they said: ` + req.body.Body);

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
  res.render('sms', { title: 'SMS boi', user: req.user, notes: req.body });
});

module.exports = router;