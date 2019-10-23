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

// POST request for creating Note.
router.post('/create', notes_controller.notes_create_post);

// POST request to delete Note.
router.post('/:note_id/delete', notes_controller.notes_delete_post);


router.get('/:note_id/', notes_controller.notes_get_note);

// POST request to update Note.
router.post('/:note_id/update', notes_controller.notes_update_post);

// GET request for list of all Note items.
// router.get('/notes', notes_controller.index);

// // GET request to update Note Category.
// router.get('/notes/:note_category/update', notes_controller.note_category_update_get);

// // POST request to update Note Category.
// router.post('/notes/:note_category/update', notes_controller.note_category_update_post);

module.exports = router;