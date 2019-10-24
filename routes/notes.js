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
router.get('/:note_id/delete', notes_controller.notes_delete_post);

// GET a single Note
router.get('/:note_id/', notes_controller.notes_get_note);

// POST request to update Note.
router.get('/:note_id/update', notes_controller.notes_update_post);

module.exports = router;