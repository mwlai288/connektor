const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.gamertags = !isEmpty(data.gamertags) ? data.gamertags : '';
  data.status = !isEmpty(data.status) ? data.status : '';
  data.games = !isEmpty(data.games) ? data.games : '';

  if (!Validator.isLength(data.gamertags, { min: 2, max: 40 })) {
    errors.gamertags = 'gamertags needs to between 2 and 4 characters';
  }

  if (Validator.isEmpty(data.gamertags)) {
    errors.gamertags = 'Profile gamertags is required';
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = 'Status field is required';
  }

  if (Validator.isEmpty(data.games)) {
    errors.games = 'Games field is required';
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = 'Not a valid URL';
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = 'Not a valid URL';
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = 'Not a valid URL';
    }
  }

  if (!isEmpty(data.twitch)) {
    if (!Validator.isURL(data.twitch)) {
      errors.twitch = 'Not a valid URL';
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = 'Not a valid URL';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
