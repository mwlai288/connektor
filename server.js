const express = require('express');
const mongoose = require('mongoose');

// bring in files
const auth = require('./routes/api/auth');
const profile = require('./routes/api/profile');
const post = require('./routes/api/post');

const app = express(); // initialize variable

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDb Connected'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => res.send('Hello'));

// Use Routes
app.use('/api/auth', auth);
app.use('/api/profile', profile);
app.use('/api/post', post);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
