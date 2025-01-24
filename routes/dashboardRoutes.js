const express = require('express');
const { ensureAuthenticated } = require('../middleware/auth');
const path = require('path');

const router = express.Router();

router.get('/dashboard.html', ensureAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/dashboard.html'));
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
