const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

//To-Do-List Schema
const todoListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  completed: { type: Boolean, required: true, default: false },
  dateCreated: { type: Date, default: Date.now, required: true },
  dateCompleted: Date,
  status: {
    type: String,
    default: "incomplete",
    required: true,
    enum: ["incomplete", "complete", "deferred"],
  },
  id: { type: String, default: uuidv4 },
});

const task = mongoose.model("to-do-lists", todoListSchema);

module.exports = task;
