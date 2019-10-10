const accountSid = 'AC2da19e82eb2108a50a91d7d8b25cc6c5';
const authToken = '162ce9e437b71541fdbc88fea79915a1';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+17326274438',
     to: '+17328326780'
   })
  .then(message => console.log(message.sid));