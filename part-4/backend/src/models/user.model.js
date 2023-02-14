/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    index: true,
    required: [true, "Username required"],
    validate: {
      validator: (v) =>
        /^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/.test(v),
      message: (props) => `${props.value} is not a valid username!`,
    },
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Name required"],
    minLength: [3, "Name must be at least 3 characters long"],
    maxLength: [20, "Name must be at most 20 characters long"],
  },
  passwordHash: {
    type: String,
    required: [true, "Password required"],
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

UserSchema.plugin(uniqueValidator);

UserSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.__v;
    delete returnedObject._id;
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
