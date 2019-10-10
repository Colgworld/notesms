var express = require('express');
var router = express.Router();
const MessagingResponse = require('twilio').twiml.MessagingResponse;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('sms', { title: 'SMS Page' });
});

router.post('/', (req, res) => {
  const twiml = new MessagingResponse();
  
  twiml.message('Works ~~~~~~~~~~!');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
  res.render('sms', { title: 'SMS boi' });
});

module.exports = router;
