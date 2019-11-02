const express = require('express');
const router = express.Router();
const notes_controller = require('../controllers/notesController');

// POST all Notes
router.post('/', notes_controller.index);

// POST all Users
router.post('/get_users', notes_controller.get_users);

// POST request for creating Note.
router.post('/create', notes_controller.notes_create_post);

// POST request to delete Note.
router.get('/:note_id/delete', notes_controller.notes_delete_post);

// GET a single Note
router.get('/:note_id/', notes_controller.notes_get_note);

// GET request to update Note.
router.get('/:note_id/update', notes_controller.notes_update_post);

module.exports = router;