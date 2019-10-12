/* eslint-disable prefer-arrow-callback,func-names */

require('dotenv').config({ path: './.env.test' });
require('should');

const supertest = require('supertest-session');
const cheerio = require('cheerio');
const app = require('../app');
const db = require('../models');
const { runMigrations } = require('../testUtilities');


function Session() {
  return supertest(app);
}

function clearDb() {
  const modelKeys = Object.keys(db);
  const destroyTasks = modelKeys.map((key) => {
    if (['sequelize', 'Sequelize'].includes(key)) return null;
    return db[key].destroy({ where: {}, force: true });
  });

  return Promise.all(destroyTasks);
}


describe('Register', function () {
  before(function () {
    return runMigrations();
  });

  beforeEach(async function () {
    await clearDb();
    this.session = Session();
    this.newUserData = {
      firstName: 'test_firstName',
      lastName: 'test_lastName',
      password: 'test_password',
      confirmPassword: 'test_password',
      role: null,
      phoneNumber: '+523321678080',
      verificationMethod: 'sms',
    };
  });

  it('create a user', function () {
    return this.session.post('/register')
      .send(this.newUserData)
      .expect(302)
      .expect('Location', '/');
  });

  it('phone number exists raises failure', async function () {
    await this.session.post('/register')
      .send(this.newUserData)
      .expect(302)
      .expect('Location', '/');

    await this.session.post('/register')
      .send(this.newUserData)
      .expect((res) => {
        const $ = cheerio.load(res.text);
        const phoneValidationMsg = $('#fullPhone > .invalid-feedback').html();
        phoneValidationMsg.should.equal('Phone number already exists.');
      })
      .expect(400);
  });

  it('create user, logout and log back in', async function () {
    const logInData = {
      phoneNumber: this.newUserData.phoneNumber,
      password: this.newUserData.password,
    };
    await this.session.post('/register')
      .send(this.newUserData)
      .expect(302)
      .expect('Location', '/');

    await this.session.post('/login')
      .send(logInData)
      .expect(302)
      .expect('Location', '/');
  });
});
