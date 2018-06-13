// authentication, login, passwords go in here.
const express = require('express');
const router = express.Router();

// @route:    GET api/auth/test
// @desc:     Test auth route
// @access:   Private

router.get('/test', (req, res) => res.json({ msg: 'Auth works' }));

module.exports = router;
