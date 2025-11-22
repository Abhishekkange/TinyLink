const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  shortName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  longUrl: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /^(http|https):\/\/[^ "]+$/.test(v);
      },
      message: "Invalid URL format"
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  clickCount: {
    type: Number,
    default:0
  },
  lastClickedTime: {
    type: Date,
    default:Date.now
  }
});

const LinkModel = mongoose.model('Link', linkSchema);
module.exports = LinkModel;
