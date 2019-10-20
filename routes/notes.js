const { ensureLoggedIn } = require('connect-ensure-login');
const express = require('express');
const userRoles = require('../userRoles');
const router = express.Router();
const db = require('../models');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const UUID = require("uuidjs");

var notes_controller = require('../controllers/notesController');

// GET catalog home page.
router.get('/', notes_controller.index);

// GET request for creating a Note. NOTE This must come before routes that display Note (uses id).
router.get('/notes/create', notes_controller.notes_create_get);

// POST request for creating Note.
router.post('/notes/create', notes_controller.notes_create_post);

// GET request to delete Note.
router.get('/notes/:id/delete', notes_controller.notes_delete_get);

// POST request to delete Note.
router.post('/notes/:id/delete', notes_controller.notes_delete_post);

// GET request to update Note.
router.get('/notes/:id/update', notes_controller.notes_update_get);

// POST request to update Note.
router.post('/notes/:id/update', notes_controller.notes_update_post);

// GET request for one Note.
// router.get('/notes/:id', notes_controller.notes_detail);

// GET request for list of all Note items.
router.get('/notes', notes_controller.notes_list);

router.get('/', 
  ensureLoggedIn(), 
  userRoles.can('access secret content'), 
  (req, res) => {
    console.log(req.params.username)

    res.render('index', { title: 'SMS'});
});

// Look up User and store note to DB
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