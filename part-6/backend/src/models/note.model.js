const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  importance: {
    type: Boolean,
    required: true,
  },
  votes: {
    type: Number,
  },
});

NoteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Note", NoteSchema);
