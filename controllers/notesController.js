const db = require('../models');
const express = require('express');
const UUID = require("uuidjs");
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const twiml = new MessagingResponse();
var Note = require('../models/notes');

// GET list of a Users Notes.
async function index(req, res) {
  var notes;
  console.log(req.body)
  var results;
  var phoneNumber = req.body.phoneNumber;
  try { 
    notes = await db.Notes.findAll({ 
      where: {
        phoneNumber: phoneNumber
      },
      raw: true,
    });
  } catch(err) {
    res.send({
      phoneNumber: phoneNumber,
      user_id: "none",
    });
  }

  var note_text = [];
  for(var i = 0; i < notes.length; i++) {
    var obj = notes[i].text;
    note_text.push(obj)
  }
  note_text.unshift(null)

  var text = note_text.toString();
  text.replace(/\n/g, ',')
  var newchar = '\n - '
  text = text.split(',').join(newchar);

  result = `Here are today's notes: \n` + text;
  res.send({ result });
};

async function get_users(req, res) {
  var user_info;
  var user_id;
  var phoneNumber = req.body.phoneNumber

    try {
      user_info = await db.User.findAll({ 
        raw: true,
        where: { 
          phoneNumber: phoneNumber, 
        }
      })
    } catch(err) {
      res.send({
        user_id: "none"
      })
    }
  
  user_info = JSON.stringify(user_info);
  user_id = user_info[0].id

  console.log(user_info)
  res.send({ 
    phoneNumber: phoneNumber,
    user_id: user_id,
    user_info: user_info,
  });
};

// Handle Note create on POST.
async function notes_create_post(req, res) {
  var note_id = UUID.generate();
  var notes;
  var phoneNumber = req.body.phoneNumber
  var user_id;

  try {
    notes = await db.Notes.create({
      user_id: user_id,
      note_id: note_id,
      phoneNumber: phoneNumber,
      text: req.body.text
    })
  } catch(err) {
    console.log(err)
  }

  notes = JSON.stringify(notes);

  res.send({ 
    phoneNumber: phoneNumber,
    user_id: user_id,
    note: notes,
   });
};

// Get a single Note's info
async function notes_get_note(req, res) {
  var note; 
  
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

module.exports.index = index
module.exports.get_users = get_users
module.exports.notes_create_post = notes_create_post
module.exports.notes_get_note = notes_get_note
module.exports.notes_delete_post = notes_delete_post
module.exports.notes_update_post = notes_update_post
