const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  gamertags: {
    type: String,
    required: true,
    max: 40
  },
  systems: {
    type: String
  },
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    instagram: {
      type: String
    },
    twitch: {
      type: String
    }
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  games: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
