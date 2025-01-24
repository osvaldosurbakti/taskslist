const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isPublic: {
    type: Boolean,
    default: true,
  },
  imageUrl: {
    type: String, // URL gambar akan disimpan sebagai string
    required: false,
  },
});

module.exports = mongoose.model('Task', taskSchema);