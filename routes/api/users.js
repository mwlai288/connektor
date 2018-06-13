const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

// load User model
const User = require('../../models/User');

// @route GET api/users/test
// @desc Tests users route
// @access Public

router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

// @route GET api/users/register
// @desc Register user
// @access Public

router.post('/register', async (req, res) => {
  const registerNewUser = await User.findOne({ email: req.body.email });
  if (registerNewUser) {
    return res.status(400).json({ email: 'Email already exists' });
  } else {
    const avatar = gravatar.url(req.body.email, {
      s: '200', // size
      r: 'pg', // rating
      d: 'mm' // default
    });
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      avatar,
      password: req.body.password
    });
    const hashPassword = await bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        try {
          if (err) throw err;
          newUser.password = hash;
          newUser.save();
          res.json(newUser);
        } catch (err) {
          console.log(err);
        }
      });
    });
  }
});

// @route GET api/users/login
// @desc Login user / Return JWT
// @access Public

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  // Find user by email
  const correctLogin = await User.findOne({ email });
  // Check for user
  if (!correctLogin) {
    return res.status(404).json({ email: 'User not found' });
  }
  // Check Password
  const correctPass = await bcrypt.compare(password, correctLogin.password);
  if (correctPass) {
    // User Matched
    const { id, name, avatar } = correctLogin;
    const payload = {
      id,
      name,
      avatar
    }; // create JWT Payload
    // Sign the Token
    jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
      res.json({ success: true, token: 'Bearer ' + token });
    });
  } else {
    return res.status(400).json({ password: 'Password incorrect' });
  }
});

module.exports = router;
