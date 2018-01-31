const express = require('express');
const router = express.Router();
const Pusher = require('pusher');

const config = require('../config');

const pusher = new Pusher({
  appId: config.APP_ID,
  key: config.KEY,
  secret: config.SECRET,
  cluster: config.CLUSTER,
  encrypted: config.ECRYPTED
});

router.get('/', (req, res) => {
  res.send('POLL');
});

router.post('/', (req, res) => {
  pusher.trigger('os-poll', 'os-vote', {
    points: 1,
    os: req.body.os
  });

  return res.json({ success: true, message: 'Thank You For Voting' });
});

module.exports = router;
