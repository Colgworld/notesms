const { ensureLoggedIn } = require('connect-ensure-login');
const express = require('express');
const userRoles = require('../userRoles');
const router = express.Router();
const db = require('../models');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const UUID = require("uuidjs");

router.get('/', 
  ensureLoggedIn(), 
  userRoles.can('access secret content'), 
  (req, res) => {
    res.render('index', { title: 'SMS', user: user.username });
});

router.post('/', async (req, res, next) => {
  const twiml = new MessagingResponse();
  var note_id = UUID.generate();

  var users;
  if (!users) {
    var users = await db.User.findOne({ where: { phoneNumber: req.body.From } });
  } else {
    console.log(`username = ` + users.username)
  }

  try { 
    const notes = await db.Notes.create({
      note_id: note_id,
      username: users.username,
      note: req.body.Body,
      categories: null,
      phoneNumber: req.body.From,
    })
  } catch(err) {
    console.log(err, req.body);
  }



  twiml.message('Notedasdfasdfasdf!');
  res.render('sms', { title: 'SMS boi', user: users.username});

  res.end(twiml.toString());
});

module.exports = router;