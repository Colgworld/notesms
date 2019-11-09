const db = require('../models');
const express = require('express');
const UUID = require("uuidjs");
const MessagingResponse = require('twilio').twiml.MessagingResponse;
var Note = require('../models/notes');
// hi
// GET list of a Users Notes.
async function index(req, res) {
  var notes;
  var results;
  var phoneNumber = req.user.phoneNumber || req.body.phoneNumber;
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
  res.end();
};

async function get_notes(req, res) {
  var notes;
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
    null
  }

  var note_text = [];
  for(var i = 0; i < notes.length; i++) {
    var obj = notes[i].text;
    note_text.push(obj)
  }
  note_text.unshift(null)

  var text = note_text.toString();
  var newchar = '\n - '

  text.replace(/\n/g, ',')
  text = text.split(',').join(newchar);
  console.log(text.length)

  if (text.length > 0) {
    result = `Here are today's notes: \n` + text;
  } else {
    result = `Nothing here yet! Send a text to start your list of notes or type 'Noted' for help.` ;
  }

  res.send({ result });
};

// GET list of a Users
async function get_users(req, res) {
  
  var user_info;
  var userStatus;
  var result;
  
  var phoneNumber = req.body.phoneNumber;

  try {
    user_info = await db.User.findAll({ 
      raw: true,
      where: { 
        phoneNumber: phoneNumber, 
      }
    })
  } catch(e) {
    res.send({ 
      isUser: userStatus
    });
  }

  if (user_info.length != 0) {
    result = {
      phoneNumber: phoneNumber,
      user_id: user_info[0].id,
      user_phoneNumber: user_info[0].phoneNumber
    }
  } else {
    result = {
      phoneNumber: phoneNumber,
      user_id: "none",
      user_phoneNumber: "none"
    }
  }

  res.send({ result });
};

// Handle Note create on POST.
async function notes_create_post(req, res) {
  var note_id = UUID.generate();
  var notes;
  var phoneNumber = req.body.phoneNumber
  var user_id = req.body.user_id;
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
  res.end();
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
    null
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
        phoneNumber: req.body.phoneNumber
      },
      raw: true,
    })
  } catch(err) {
    null
  }
  notes = JSON.stringify(notes);

  res.send("done")
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

  res.redirect('/notes/' + req.params.note_id);
};

module.exports.index = index
module.exports.get_users = get_users
module.exports.notes_create_post = notes_create_post
module.exports.notes_get_note = notes_get_note
module.exports.get_notes = get_notes
module.exports.notes_delete_post = notes_delete_post
module.exports.notes_update_post = notes_update_post
