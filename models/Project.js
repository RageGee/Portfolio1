const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [String],
  image: String,
  link: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema); 