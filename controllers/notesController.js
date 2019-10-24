const { ensureLoggedIn } = require('connect-ensure-login');
const userRoles = require('../userRoles');
const db = require('../models');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const UUID = require("uuidjs");

var Note = require('../models/notes');

// GET list of a Users Notes.
async function index(req, res) {
  var notes;
    
  try { 
    notes = await db.Notes.findAll({ 
      where: {
        username: req.user.username
      },
      raw: true,
    })
  } catch(err) {
    console.log(err)
  }

  notes = JSON.parse(JSON.stringify(notes))

  res.render('notes', { 
    title: 'NOTES',
    results: notes,
  });
};

// Handle Note create on POST.
async function notes_create_post(req, res) {
  const twiml = new MessagingResponse();
  var note_id = UUID.generate();
  var notes;
  var user_info;
  var incomingNumber = req.body.From || req.user.phoneNumber;
  var results;

  if(user_info == null || undefined ){
      user_info = await db.User.findAll({ 
        raw: true,
        where: { 
          phoneNumber: incomingNumber, 
        }
      });
    } else {
      null
  }

  try { 
    notes = await db.Notes.create({
      note_id: note_id,
      username: user_info[0].username,
      note: req.body.Body,
      categories: null,
      phoneNumber: incomingNumber,
    })
  } catch(err) {
    console.log(`Couldn't fetch notes: ` + err)
  }
  
  results = Object.assign({}, ...notes);
  console.log(`results: ` + results);

  twiml.message('Got it!');
  twiml.toString();

  res.render('notes', { 
   title: 'NOTES',
   results
  });
};

// Get a single Note's info
async function notes_get_note(req, res) {
  var note;
  
  try { 
    note = await db.Notes.findOne({ 
      where: {
        note_id: req.params.note_id
      },
      raw: true,
    })
  } catch(err) {
    console.log(err)
  }

  note = JSON.parse(JSON.stringify(note))
  console.log(note)
  res.render('singleNote', { 
    title: 'GET NOTE',
    results: note,
  });
};

// Handle Note delete on POST.
async function notes_delete_post(req, res) {
  var notes;
  try { 
    notes = await db.Notes.destroy({ 
      where: {
        note_id: req.params.note_id
      },
      raw: true,
    })
  } catch(err) {
    console.log(err)
  }
  notes = JSON.stringify(notes);

  console.log(`Notes: ` + notes)
  console.log(`Params: ` + JSON.stringify(req.params))

  res.redirect('/notes')
};

// Handle Note update on POST.
async function notes_update_post(req, res) {
  var note;
  
  try { 
    note = await db.Notes.update({
      note: req.body.note,
      categories: req.body.category,
      }, {
      where: { 
        note_id: req.params.note_id 
      },
      returning: true,
      raw: true
    })
  } catch(err) {
    console.log(err)
  }

  note = JSON.parse(JSON.stringify(note))

  res.redirect('/notes/' + note.note_id);
};

module.exports.notes_create_post = notes_create_post
module.exports.notes_delete_post = notes_delete_post
module.exports.notes_get_note = notes_get_note
module.exports.notes_update_post = notes_update_post
module.exports.index = index