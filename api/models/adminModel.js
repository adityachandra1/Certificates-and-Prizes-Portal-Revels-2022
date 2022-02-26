const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['OPERATION', 'SC', 'OM', 'JUDGES', 'VIGILANCE', 'CNP', 'INF', 'CATEGORY'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  token: {
    type: String,
  },
  // Only for Category type
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
    },
  ],
});

//add bcrypt later

module.exports = Admin = mongoose.model('Admin', adminSchema);