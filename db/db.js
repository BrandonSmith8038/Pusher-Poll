const mongoose = require('mongoose');

const config = require('../config/db');

// Map Global Promise
mongoose.Promise = global.Promise;

const mongoURI = `mongodb://${config.username}:${
  config.password
}@ds221258.mlab.com:21258/reddirt-pusher-poll`;

console.log(mongoURI);

//Mongoose Connect
mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDB Connected'))
  .catch(e => console.log(e));
