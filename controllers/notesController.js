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
  var user_id = req.user.id;
  try { 
    notes = await db.Notes.findAll({ 
      where: {
        user_id: user_id
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

  try {
    user_info = await db.User.findAll({ 
      raw: true,
      where: { 
        phoneNumber: incomingNumber, 
      }
    })
  } catch(err) {
    console.log(err)
  }
  // console.log(user_info)
  // var user_id = 

  // parseInt(user_id, 10);;

  try { 
    notes = await db.Notes.create({
      user_id: user_info[0].id,
      note_id: note_id,
      text: req.body.Body
    })
  } catch(err) {
    console.log(`Couldn't fetch notes: ` + err)
  }
  
  console.log(JSON.stringify(notes))
  results = JSON.stringify(notes);

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
  console.log(req.body)
  console.log(req.params)
  console.log(req.user)  
  
  try { 
    note = await db.Notes.findOne({ 
      where: {
        id: req.params.note_id
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
        id: req.params.note_id
      },
      raw: true,
    })
  } catch(err) {
    console.log(err)
  }
  notes = JSON.stringify(notes);

  res.redirect('/notes')
};

// Handle Note update on POST.
async function notes_update_post(req, res) {
  var note;
  var values = { 
    text: req.body.text,
  };
  var selector = { 
    where: { 
      id: req.params.note_id 
    },
    returning: true,
    raw: true
  };

  try { 
    note = await db.Notes.update(values, selector)
  } catch(err) {
    console.log(err)
  }

  note = JSON.stringify(note)
  console.log(`Notes: ` + note)

  res.redirect('/notes/' + req.params.note_id);
};

module.exports.notes_create_post = notes_create_post
module.exports.notes_delete_post = notes_delete_post
module.exports.notes_get_note = notes_get_note
module.exports.notes_update_post = notes_update_post
module.exports.index = index