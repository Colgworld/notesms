var express = require('express');
var router = express.Router();
var passport = require('passport-local');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signin', { title: 'SignUp' });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

module.exports = router;


