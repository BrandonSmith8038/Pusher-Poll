const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const poll = require('./routes/poll');

const app = express();

//Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Enable Cors
app.use(cors);

app.use('/poll', poll);

const port = 3001 || process.env.PORT;
const ip = process.env.IP;

app.listen(port, ip, () => console.log(`App start on port ${port}`));
