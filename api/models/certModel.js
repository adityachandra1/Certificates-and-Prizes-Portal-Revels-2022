const mongoose = require('mongoose');

const certSchema = new mongoose.Schema({
  name: {
    type: String
  },
  event: {
    type: String
  },
  email: {
    type: String,
  },
  token: {
    type: String,
  },
});

module.exports = Certificate = mongoose.model('Certificate', certSchema);