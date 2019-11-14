const path = require('path');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const fs = require('fs');
const Sequelize = require('sequelize');


// eslint-disable-next-line import/no-dynamic-require
const config = require(`${__dirname}/../config/config.json`)[env];
const db = {};

let sequelize;

sequelize = new Sequelize(
  "postgres://zqczedepziuhkm:10bde09fd95a9b25f934e80bebad48157e96c8746cdda93fa4c645c84f196bc9@ec2-54-221-214-3.compute-1.amazonaws.com:5432/d2vs0r28767kil"
    {
      dialect: "postgres",
      logging: false,
      pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      dialectOptions: {
        ssl: true
      },
      define: {
        underscored: true
      }
    }
  );

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
