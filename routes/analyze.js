const { ensureLoggedIn } = require('connect-ensure-login');
const express = require('express');
const userRoles = require('../userRoles');
const router = express.Router();
const {Storage} = require('@google-cloud/storage');
const storage = new Storage();

storage
  .getBuckets()
  .then((results) => {
    const buckets = results[0];

    console.log('Buckets:');
    buckets.forEach((bucket) => {
      console.log(bucket.name);
    });
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });

async function quickstart(text) {
      const language = require('@google-cloud/language');
      const client = new language.LanguageServiceClient();
      ;
      const document = {
        content: text,
        type: 'PLAIN_TEXT',
      };
      const [result] = await client.analyzeSentiment({document: document});
      const sentiment = result.documentSentiment;

      console.log(`Text: ${text}`);
      console.log(`Sentiment score: ${sentiment.score}`);
      console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
    }

router.get('/', 
  ensureLoggedIn(), 
  userRoles.can('access secret content'), 
  (req, res) => {
  console.log(JSON.stringify(req.body));
  console.log(quickstart(req.body.note));
  res.render('index', { title: 'SMS', user: user.username, phoneNumber: user.phoneNumber });
});

module.exports = router;
