const express = require('express');
const router = express.Router();
const notes_controller = require('../controllers/notesController');

// POST all Notes
router.get('/', notes_controller.index);

// POST all Users
router.post('/get_users/', notes_controller.get_users);

// POST request for creating Note.
router.post('/create', notes_controller.notes_create_post);

// POST request to delete Note.
router.post('/refresh', notes_controller.notes_delete_post);

// GET a single Note
router.get('/:note_id/', notes_controller.notes_get_note);

// GET request to update Note.
router.get('/:note_id/update', notes_controller.notes_update_post);

// GET notes for AUth'd User.
router.post('/get_notes', notes_controller.get_notes);

module.exports = router;