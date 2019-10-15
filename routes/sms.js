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

router.post('/', async (req, res) => {
  const twiml = new MessagingResponse();
  var note_id = UUID.generate();

  var users;
    if (users == null) {
      const users = db.User.findOne({ where: { phoneNumber: req.body.From } });
    } else {
      console.log(`username = ` + user.username)
    }
  const userInfo = db.Notes.findAll();
  console.log(userInfo)
  
  // const notes = await db.Notes.create({
  //   note_id: note_id,
  //   username: users.username,
  //   note: req.body.Body,
  //   categories: null,
  //   phoneNumber: req.body.From,
  // },
  //  {returning: true}
  // )
  // .catch(null);

  twiml.message('Noted!');
  res.render('sms', { title: 'SMS boi', user: users.username, notes: notes.note });

  res.end(twiml.toString());
});

module.exports = router;