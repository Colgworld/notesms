const { ensureLoggedIn } = require('connect-ensure-login');
const userRoles = require('../userRoles');
const db = require('../models');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const UUID = require("uuidjs");

var Note = require('../models/notes');
var Note = require('../models/user');

exports.index = function(req, res) {
    console.log(req.params.username)
    res.render('index', { title: 'Notes Page'});
};

// Display list of all Notes.
exports.notes_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Note list');
};

exports.notes_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Note list');
};

// Display Note create form on GET.
exports.notes_create_get = async function(req, res) {
  var incomingNumber = req.body.From || req.user.phoneNumber;

  user_info = await db.User.findAll({ 
    raw: true,
    where: { 
      phoneNumber: incomingNumber, 
    }
  });
  res.send(user_info);
};

// Handle Note create on POST.
async function notes_create_post(req, res) {
  const twiml = new MessagingResponse();
  var id = UUID.generate();
  var user_info;
  var notes;

  try { 
    notes = await db.Notes.create({
      id: id,
      user_id: user_info[0].user_id,
      text: req.body.Body,
    })
  } catch(err) {
    console.log(err)
  }

  twiml.message('Got it!');
  twiml.toString()
  res.render('notes', { 
   title: 'NOTES',
   id: id, 
   text: req.body.Body,
   username: user_info[0].username, 
   phoneNumber: incomingNumber,
   notes: notes,
  });
};

module.exports.notes_create_post = notes_create_post;


// Display Note delete form on GET.
exports.notes_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Note delete GET');
};

// Handle Note delete on POST.
exports.notes_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Note delete POST');
};

// Display Note update form on GET.
exports.notes_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Note update GET');
};

// Handle Note update on POST.
exports.notes_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Note update POST');
};