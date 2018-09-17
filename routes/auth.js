'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/signup', (req, res, next) => {
  const signupError = req.flash('signup-form-error');
  const usernameError = req.flash('username-form-error');
  const data = {
    message1: signupError[0],
    message2: usernameError[0]
  };
  res.render('signup', data);
});

router.post('/signup', (req, res, next) => {
  // validate username and password
  const { username, password } = req.body;
  if (!username || !password) {
    req.flash('signup-form-error', 'Username and password are mandatory');
    return res.redirect('/auth/signup');
  }

  // validate unique username
  User.find({ username: req.body.username })
    .then(results => {
      if (results.length) {
        req.flash('username-form-error', 'This username is already taken :( ');
        return res.redirect('/auth/signup');
      }
    });
});

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.post('/login', (req, res, next) => {
  // ???????
});

module.exports = router;
