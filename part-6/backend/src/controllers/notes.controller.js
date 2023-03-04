const asyncHandler = require("express-async-handler");
const Note = require("../models/Note.model");

const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({});
  res.json(notes);
});

const createNote = asyncHandler(async (req, res) => {
  const { content, importance, votes = 0 } = req.body;
  const note = await Note.create({
    content,
    importance,
    votes,
  });
  res.status(201).json(note);
});

const updateNote = asyncHandler(async (req, res) => {
	const { content, importance, votes } = req.body;
	const note = await Note.findById(req.params.id);
	if (note) {
		note.content = content;
		note.importance = importance;
		note.votes = votes;
		const updatedNote = await note.save();
		res.json(updatedNote);
	} else {
		res.status(404);
		throw new Error("Note not found");
	}
});

module.exports = { getNotes, createNote, updateNote };
