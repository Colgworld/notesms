const { ensureLoggedIn } = require('connect-ensure-login');
const express = require('express');
const userRoles = require('../userRoles');
const router = express.Router();
const language = require('@google-cloud/language');
const client = new language.LanguageServiceClient();

router.post('/', async (req, res, next) => {

  async function getEntities(text) {

    const document = {
      content: text,
      type: 'PLAIN_TEXT',
    };
    const [result] = await client.analyzeEntitySentiment({document: document});
    const entities = result.entities;
    
    console.log('Entities:');
    entities.forEach(entity => {
        console.log(entity.name);
        console.log(`  Name: ${entity.name}`);
        console.log(`  Score: ${entity.sentiment.score}`);
        console.log(`  Magnitude: ${entity.sentiment.magnitude}`);

        console.log(` - Type: ${entity.type}, Salience: ${entity.salience}`);
        if (entity.metadata && entity.metadata.wikipedia_url) {
          console.log(` - Wikipedia URL: ${entity.metadata.wikipedia_url}$`);
        }
      });
  }
  async function getCategories(text, err) {

    const document = {
      content: text,
      type: 'PLAIN_TEXT',
    };

    const [classification] = await client.classifyText({document: document});
    console.log('Categories:');
    classification.categories.forEach(category => {
      console.log(`Name: ${category.name}, Confidence: ${category.confidence}`);
    });
    if (err) {
      
    }
  }

  getEntities(req.body.note);
  getCategories(req.body.note);

  res.render('index', { title: 'SMS' });
});

module.exports = router;

// curl -d '{"note":"Milk, Eggs, Cheese, Turkey, Bread, Mayonnaise, Pickles, Water Bottles, Tuna, Cat Food, Oatmeal, Dog Treats, Toilet Paper, Ham, Peanut Butter, Jelly, Clif Bars, Bublys, Lipton Iced Tea, Tortilla Chips "}' -H "Content-Type: application/json" -X POST http://localhost:3000/analyze



