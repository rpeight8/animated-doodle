const moongose = require("mongoose");

const AuthorSchema = new moongose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
});

module.exports = moongose.model("Author", AuthorSchema);
