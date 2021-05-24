const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  given_name: {
    type: String,
  },
  family_name: {
    type: String,
  },
  providerId: {
    type: String,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
  },
  salesforceAccessToken: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);
