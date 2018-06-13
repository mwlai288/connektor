const express = require('express');
const mongoose = require('mongoose');

const app = express(); // initialize variable

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDb Connected'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => res.send('Hello'));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
