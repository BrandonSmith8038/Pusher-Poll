const express = require('express');
const router = express.Router();
const Pusher = require('pusher');
const mongoose = require('mongoose');

const Vote = require('../models/Vote');

const config = require('../config/pusher');

const pusher = new Pusher({
  appId: config.APP_ID,
  key: config.KEY,
  secret: config.SECRET,
  cluster: config.CLUSTER,
  encrypted: config.ECRYPTED
});

router.get('/', (req, res) => {
  Vote.find()
    .then(votes => res.json({ success: true, votes: votes }))
    .catch(e => console.log(e));
});

router.post('/', (req, res) => {
  const newVote = {
    os: req.body.os,
    points: 1
  };

  new Vote(newVote).save().then(vote => {
    pusher.trigger('os-poll', 'os-vote', {
      points: parseInt(vote.points),
      os: vote.os
    });

    return res.json({ success: true, message: 'Thank You For Voting' });
  });
});

module.exports = router;
