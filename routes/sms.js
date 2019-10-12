var express = require('express');
var router = express.Router();
const MessagingResponse = require('twilio').twiml.MessagingResponse;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('sms', { title: 'SMS Page' });
});

router.post('/', (req, res) => {
  const twiml = new MessagingResponse();
  
  twiml.message('Noted!');

  // console.log(twiml.toString());
  console.log(req.body);
  // twiml.message('It looks like your phone number was born in ' + req.body);
  // res.writeHead(200, {'Content-Type': 'text/xml'});
  // res.end(twiml.toString());
  res.render('sms', { title: 'SMS boi' });
});

module.exports = router;

