const express = require('express');
const User = require('../models/User');
const router  = express.Router();
const {ensureLoggedIn} = require('connect-ensure-login')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});


// router.get('/users', ensureLoggedIn('/auth/login'), (req,res,next) => {
router.get('/users', checkRoles('ADMIN'), (req,res,next) => {
  User.find()
  .then(users => {
    res.render('users-list', {users})
  })
})

function checkRoles(role) {
  return function(req, res, next) {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    } else {
      res.redirect('/auth/login')
    }
  }
}

module.exports = router;

