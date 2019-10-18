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
    res.render('index', { title: 'SMS', user: user.username, phoneNumber: user.phoneNumber });
});

router.post('/', async (req, res, next) => {
  const twiml = new MessagingResponse();
  var note_id = UUID.generate();
  var user_info;
  var notes;
  var incomingNumber = req.body.From || req.user.phoneNumber;

  user_info = await db.User.findAll({ 
    raw: true,
    where: { 
      phoneNumber: incomingNumber, 
    }
  });


  console.log(JSON.stringify(req.body));

  try { 
    notes = await db.Notes.create({
      note_id: note_id,
      username: user_info[0].username,
      note: req.body.Body,
      categories: null,
      phoneNumber: incomingNumber,
    })
  } catch(err) {
    console.log(err)
  }

  twiml.message('Got it!');
  twiml.toString()
  res.render('notes', { 
   title: 'NOTES',
   note_id: note_id, 
   note: req.body.Body,
   username: user_info[0].username, 
   phoneNumber: incomingNumber,
   notes: notes,
  });
});

module.exports = router;

// Example Post
// app.post('/sms', (req, res) => {
//   const twiml = new MessagingResponse();

//   twiml.message('The Robots are coming! Head for the hills!');

//   res.end(twiml.toString());
// });

// http.createServer(app).listen(1337, () => {
//   console.log('Express server listening on port 1337');
// });