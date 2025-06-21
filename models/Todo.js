const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: false },
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model("Todo", todoSchema);
