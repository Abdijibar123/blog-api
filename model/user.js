const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 6 },
  avatar: { type: String, default:"https://ionicframework.com/docs/img/demos/avatar.svg" },
  bio: { type: String },
  location: { type: String },
  work: { type: String },
  joinDate: { type: Date, default: Date.now },
});

const userModel = model("User", userSchema);

module.exports = userModel;
